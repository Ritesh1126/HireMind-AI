const express = require('express')
const userModel = require("../models/user.model")

const authRouter = Router()
/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

module.exports = authRouter