const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description Controller to handle user registration
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    // check fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    // generate token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // send cookie
    res.cookie("token", token);

    // response
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = {
    registerUserController,
    loginUserController: async (req, res) => {
        const { email, password } = req.body;
    }
};