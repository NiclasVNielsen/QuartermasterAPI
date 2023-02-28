const mongoose = require("mongoose")

const Schema = mongoose.Schema

let companiesSchema = new Schema({
    title: {type: String},
    projects: [],
    employees: []
})

module.exports = mongoose.model("companies", companiesSchema)