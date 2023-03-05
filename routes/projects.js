const router = require("express").Router()
const project = require("../models/project")
const error404 = require("../errors/404")
const error500 = require("../errors/500")
const { verifyToken } = require("../validation/token")

//? Create
// /api/projects/ - post
router.post("/", verifyToken, (req, res) => {
    data = req.body
    project.insertMany(data)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read
// Read all
// /api/projects/ - get
router.get("/", verifyToken, (req, res) => {
    project.find()
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


// Read by ID
// /api/projects/:id - get
router.get("/:id", verifyToken, (req, res) => {
    project.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//? Update
//! Wrong id shoots a 500 and not 404
// /api/projects/:id - put
router.put("/:id", verifyToken, (req, res) => {
    const id = req.params.id

    project.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            error404(res, { message: "project not found" })
        }else{
            res.send({ message: "Wohoo! it worked! ^^" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})

//? Delete
//! Wrong id shoots a 500 and not 404
// /api/projects/:id - delete
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id

    project.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            error404(res, { message: "project not found" })
        }else{
            res.send({ message: "Goodby project! :3" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})


module.exports = router