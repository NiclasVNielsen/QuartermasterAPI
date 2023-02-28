const router = require("express").Router()
const company = require("../models/company")
const error404 = require("../errors/404")
const error500 = require("../errors/500")

//? Create
// /api/companies/ - post
router.post("/", (req, res) => {
    data = req.body
    company.insertMany(data)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})

//? Read
// Read all
// /api/companies/ - get
router.get("/", (req, res) => {
    company.find()
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


// Read by ID
// /api/companies/:id - get
router.get("/:id", (req, res) => {
    company.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => error500(res, error))
})


//? Update
//! Wrong id shoots a 500 and not 404
// /api/companies/:id - put
router.put("/:id", (req, res) => {
    const id = req.params.id

    company.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            error404(res, { message: "company not found" })
        }else{
            res.send({ message: "Wohoo! it worked! ^^" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})

//? Delete
//! Wrong id shoots a 500 and not 404
// /api/companies/:id - delete
router.delete("/:id", (req, res) => {
    const id = req.params.id

    company.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            error404(res, { message: "company not found" })
        }else{
            res.send({ message: "Goodby company! :3" })
        }
    })
    .catch(error => error500(res, { message: "This does not exist: " + id + " 3:" }))
})


module.exports = router