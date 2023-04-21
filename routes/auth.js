const router = require("express").Router()
const user = require("../models/user")
const { registerValidation } = require("../validation/register")
const { loginValidation } = require("../validation/login")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//? Register
// /api/auth/register/ - post
router.post("/register", async (req, res) => {
    // Checks for errors
    const { error } = registerValidation(req.body)

    // Correctly filled out form?
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }

    // Is email already in use?
    const doesEmailExist = await user.findOne({ email: req.body.email })
    if(doesEmailExist){
        return res.status(400).json({ error: "Email is already in use..." })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    // Create the user object
    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password
    })

    // Register in DB
    try {
        const savedUser = await newUser.save()
        res.status(201).json({ error: null, data: savedUser._id })
    } catch (error) {
        res.status(400).json({ error })
    }
})


//? login
// /api/auth/login/ - post
router.post("/login", async (req, res) => {
    // Checks for errors
    const { error } = loginValidation(req.body)
    
    // Correctly filled out form?
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }
    
    // Does email exist?
    const userData = await user.findOne({ email: req.body.email })
    if(!userData){
        return res.status(400).json({ error: "Wrong email or password" })
    }

    // Correct password?
    const validPassword = await bcrypt.compare(req.body.password, userData.password)
    if(!validPassword){
        return res.status(400).json({ error: "Wrong email or password" })
    }

    // Create token
    const token = jwt.sign({
        id: userData.id,
        name: userData.name
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION }
    )

    // Attach token to header
    res.header("auth-token", token).json({
        error: null,
        data: { token }
    })
})


//? Resign Token


module.exports = router