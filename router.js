app = require("./server.js")

app.get("/api/aaargh", (req, res) => {
    res.send("Meow")
})

const boardRoutes = require("./routes/boards")
app.use("/api/boards", boardRoutes)

const projectRoutes = require("./routes/projects")
app.use("/api/projects", projectRoutes)

const companyRoutes = require("./routes/companies")
app.use("/api/companies", companyRoutes)

const userRoutes = require("./routes/users")
app.use("/api/users", userRoutes)

const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)