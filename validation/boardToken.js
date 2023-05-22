const joi = require("joi")
const jwt = require("jsonwebtoken")
const board = require("../models/board")

const verifyBoardToken = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token){
        return res.status(401).json({ error: "Access denied" })
    }

    board.find({ 
        _id: req.params.id,
        members: jwt.decode(token).id
    })
    .then(data => {
        if(data.length > 0){
            try {
                const verified = jwt.verify(token, process.env.TOKEN_SECRET)
                // if req.params.id => fetch board.members
                // if board.members contains verified.id
                req.user = verified
                next()
            } catch (error) {
                res.status(400).json({ error: "Invalid token"})
            }
        }else{
            res.send("You do not belong here!")
        }
    })
    .catch(error => error500(res, error))

}

module.exports = { verifyBoardToken }