const userModel = require("../models/user.model")

/**
 * @name registerUserController
 * @description Controller to handle user registration
 * @access Public
 */

async function registerUserController(req, res){
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username}, {email}]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({message: "User already exists"})
    }

    // Continue with user creation logic
}

module.exports = {
    registerUserController
}