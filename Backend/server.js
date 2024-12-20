import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import connectToDB from './DB/DBConnect.js';
import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import sessionRoutes from "./Routes/session.routes.js";
import cors from 'cors';
import skillRoutes from "./Routes/skill.routes.js";
import profileRoutes from "./Routes/profile.routes.js";
import ratingRoutes from "./Routes/rating.routes.js";



dotenv.config();

const app = express();
const port = 5001;
// Enable CORS
app.use(
    cors({
      origin: 'http://localhost:3000', // Frontend URL
      credentials: true, // Allow cookies
    })
  );
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/sessions", sessionRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/rating", ratingRoutes);


app.get("/", (req, res) =>{
    res.send("Hello World!")
});

app.listen(port, () => {
    connectToDB();
    console.log(`Server running on http://localhost:${port}/`);
});
