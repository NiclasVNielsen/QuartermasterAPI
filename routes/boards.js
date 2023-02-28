const router = require("express").Router()
const board = require("../models/board")
const error500 = require("../errors/500")

//? Create
// /api/boards/ - post
router.post("/", (req, res) => {
    data = req.body
    board.insertMany(data)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read
// Read all
// /api/boards/ - get
router.get("/", (req, res) => {
    board.find()
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

// Read by ID

//? Update


//? Delete



module.exports = router