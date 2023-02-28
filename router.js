app = require("./server.js")

app.get("/api/aaargh", (req, res) => {
    res.send("Meow")
})