const error500 = (res, error) => {
    res.status(500).send( { error: "Error: 500, The page is currently on fire🔥 try again later :3"} )
    console.error(error.message)
}

module.exports = error500