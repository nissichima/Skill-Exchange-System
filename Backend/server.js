import express from "express";
import authRoutes from "./Routes/auth.routes.js"
import connectToDB from './DB/DBConnect.js'

const app = express();

const port = 5000;

app.get("/", (req, res) =>{
    res.send("Hello World")
});

app.use("/api/auth", authRoutes)

app.listen(port, () => {
    connectToDB();
    console.log(`Server running on http://localhost:${port}/`);

});