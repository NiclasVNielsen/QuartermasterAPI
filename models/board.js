const mongoose = require("mongoose")

const Schema = mongoose.Schema

let boardsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    lanes: {
        type: Object,
        require: true
    }
})

module.exports = mongoose.model("boards", boardsSchema)