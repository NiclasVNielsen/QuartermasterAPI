//? Set'n up dependencies
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

require("dotenv-flow").config()


//? Routes
import("./router.js")


//? Set'n up the Database connection
mongoose.connect(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)

try{
    mongoose
    .connection
    .once('open', () => {
        console.log("MongoDB is sail'n")}
    )
} catch(error) {
    console.error(error)
}


//? Run the ship
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Ships sail'n on port " + PORT)
})

module.exports = app