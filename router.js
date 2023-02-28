app = require("./server.js")

app.get("/api/aaargh", (req, res) => {
    res.send("Meow")
})

const boardRoutes = require("./routes/boards")
app.use("/api/boards", boardRoutes)

const projectRoutes = require("./routes/projects")
app.use("/api/boards", projectRoutes)

const companyRoutes = require("./routes/companies")
app.use("/api/boards", companyRoutes)

const userRoutes = require("./routes/users")
app.use("/api/boards", userRoutes)