const mongoose = require("mongoose")

const Schema = mongoose.Schema

let boardsSchema = new Schema({
    title: { type: String, require: true },
    members: { type: Array, require: true },
    board: { type: Array, require: true }
})

module.exports = mongoose.model("boards", boardsSchema)