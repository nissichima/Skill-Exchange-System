import express from "express";
import { createSession } from "../Controllers/session.controller.js";

const router = express.Router();

// Route to create a session
router.post("/", createSession);

export default router;
