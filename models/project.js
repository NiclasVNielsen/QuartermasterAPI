const mongoose = require("mongoose")

const Schema = mongoose.Schema

let projectsSchema = new Schema({
    title: {type: String},
    boards: []
})

module.exports = mongoose.model("projects", projectsSchema)