const router = require("express").Router()
const user = require("../models/user")
const { registerValidation } = require("../validation/register")

const error404 = require("../errors/404")
const error500 = require("../errors/500")
const bcrypt = require("bcrypt")


//? Register
// /api/auth/register/ - post
router.post("/register", async (req, res) => {
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
        res.json({ error: null, data: savedUser._id })
    } catch (error) {
        res.status(400).json({ error })
    }
})


//? login
// /api/auth/login/ - post
router.post("/login", async (req, res) => {
    
})


module.exports = router