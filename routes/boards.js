const router = require("express").Router()
const board = require("../models/board")
const error404 = require("../errors/404")
const error500 = require("../errors/500")
const { verifyToken } = require("../validation/token")
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
// /api/boards/:id - get
router.get("/:id", verifyToken, (req, res) => {
    board.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//? Update
// /api/boards/:id - put
router.put("/:id", (req, res) => {
    const id = req.params.id
 
    console.log(mongoose.Types.ObjectId.isValid(id));

    board.findById(id)
    .then(x => {
        //if (!x empty)
        //board.updateOne(req.body)
        console.log(id)
        console.log(req.body.json())
        board.findByIdAndUpdate(id, req.body.json())
        .then(data => {
            res.send({ message: "Wohoo! it worked! ^^", "reqbody": req.body, "reqbodyjson": req.body.json() })
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
router.delete("/:id", verifyToken, (req, res) => {
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