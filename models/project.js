const mongoose = require("mongoose")

const Schema = mongoose.Schema

let projectsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    boards: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("projects", projectsSchema)