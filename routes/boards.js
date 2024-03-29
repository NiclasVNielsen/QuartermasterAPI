const router = require("express").Router()
const board = require("../models/board")
const error404 = require("../errors/404")
const error500 = require("../errors/500")
const { verifyToken } = require("../validation/token")
const { verifyBoardToken } = require("../validation/boardToken")
const mongoose = require("mongoose")


//? Create
// /api/boards/ - post
router.post("/", verifyToken, (req, res) => {
    data = req.body
    board.insertMany(data)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read
// Read all
// /api/boards/ - get
router.get("/" , (req, res) => {
    board.find()
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read by ID
// /api/boards/user/:id - get
router.get("/user/:id", verifyToken, (req, res) => {
    board.find({ members: req.params.id})
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read by ID
// /api/boards/:id - get
router.get("/:id", verifyBoardToken, (req, res) => {
    board.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//? Update
// /api/boards/:id - put
router.put("/:id", verifyBoardToken, (req, res) => {
    const id = req.params.id

    board.findById(id)
    .then(x => {
        //if (!x empty)
        board.findByIdAndUpdate(id, req.body)
        .then(data => {
            res.send({ message: "Wohoo! it worked! ^^" })
        })
        .catch(error => 
        {
            error404(res, { message: "This does not exist: " + id + " 3:" })
        });
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})


//? Delete
// /api/boards/:id - delete
router.delete("/:id", verifyBoardToken, (req, res) => {
    const id = req.params.id

    board.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            error404(res, { message: "Board not found" })
        }else{
            res.send({ message: "Goodby board! :3" })
        }
    })
    .catch(error => error404(res, { message: "This does not exist: " + id + " 3:" }))
})


module.exports = router