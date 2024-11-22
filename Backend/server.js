import express from "express";
import authRoutes from "./Routes/auth.routes.js"

const app = express();

const port = 5000;

app.get("/", (req, res) =>{
    res.send("Hello World")
});

app.use("/api/auth", authRoutes)

app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));