const mongoose = require("mongoose")

const Schema = mongoose.Schema

let companiesSchema = new Schema({
    title: {type: String},
    projects: {
        type: Array,
        require: true
    },
    employees: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("companies", companiesSchema)