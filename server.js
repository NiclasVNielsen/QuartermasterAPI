//? Set'n up dependencies
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())

require("dotenv-flow").config()

app.use(bodyParser.json())


//? Swagger
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")

const swaggerDefinition = YAML.load('./swagger.yaml')
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition))


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