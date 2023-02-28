app = require("./server.js")

app.get("/api/aaargh", (req, res) => {
    res.send("Meow")
})

const boardRoutes = require("./routes/boards")
app.use("/api/boards", boardRoutes)