const router = require("express").Router()
const board = require("../models/board")
const error404 = require("../errors/404")
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


// Read Active
//! Make "Active" a property on "boards" 
// /api/boards/active - get
router.get("/active", (req, res) => {
    board.find({ active: true })
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//* Read by id should be the last we check for,
//* so for example the "active" route dose'nt
//* get interpreted as an ID


// Read by ID
// /api/boards/:id - get
router.get("/:id", (req, res) => {
    board.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//? Update
//! Wrong id shoots a 500 and not 404
router.put("/:id", (req, res) => {
    const id = req.params.id

    board.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            error404(res, { message: "Board not found" })
        }else{
            res.send({ message: "Wohoo! it worked! ^^" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})

//? Delete
//! Wrong id shoots a 500 and not 404
router.delete("/:id", (req, res) => {
    const id = req.params.id

    board.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            error404(res, { message: "Board not found" })
        }else{
            res.send({ message: "Goodby board! :3" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})


module.exports = router