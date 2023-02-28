const mongoose = require("mongoose")

const Schema = mongoose.Schema

let boardsSchema = new Schema({
    title: {type: String},
    lanes: {type: Object}
})

module.exports = mongoose.model("boards", boardsSchema)