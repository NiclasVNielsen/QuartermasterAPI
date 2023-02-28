const router = require("express").Router()
const user = require("../models/user")
const error404 = require("../errors/404")
const error500 = require("../errors/500")

//? Register
// /api/auth/register/ - post
router.post("/register", async (req, res) => {
    
})


//? login
// /api/auth/login/ - post
router.post("/login", async (req, res) => {
    
})


module.exports = router