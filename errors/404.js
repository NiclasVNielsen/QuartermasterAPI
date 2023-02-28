const error404 = (res, error) => {
    res.status(404).send( { error: "Error: 404, We can't find what you are looking for 3:"} )
    console.error(error.message)
}

module.exports = error404