const { array } = require("joi")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

let usersSchema = new Schema({
    name: {
        type: String, 
        require: true, 
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 255
    },
    personalBoards: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("users", usersSchema)