const router = require("express").Router()
const user = require("../models/user")
const error404 = require("../errors/404")
const error500 = require("../errors/500")

//? Create
// /api/users/ - post
router.post("/", (req, res) => {
    data = req.body
    user.insertMany(data)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read
// Read all
// /api/users/ - get
router.get("/", (req, res) => {
    user.find()
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


// Read by ID
// /api/users/:id - get
router.get("/:id", (req, res) => {
    user.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//? Update
//! Wrong id shoots a 500 and not 404
// /api/users/:id - put
router.put("/:id", (req, res) => {
    const id = req.params.id

    user.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            error404(res, { message: "user not found" })
        }else{
            res.send({ message: "Wohoo! it worked! ^^" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})

//? Delete
//! Wrong id shoots a 500 and not 404
// /api/users/:id - delete
router.delete("/:id", (req, res) => {
    const id = req.params.id

    user.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            error404(res, { message: "user not found" })
        }else{
            res.send({ message: "Goodby user! :3" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})


module.exports = router