// Set'n up dependencies
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

require("dotenv-flow").config()


// Routes
import("./router.js")


// Run the ship
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Ships sail'n on port " + PORT)
})

module.exports = app