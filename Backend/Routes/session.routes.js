import express from "express";
import { fetchSession, createSession } from "../Controllers/session.controller.js";

const router = express.Router();

// Route to create a session
//router.post("/", fetchSession);
router.get('/:id', fetchSession);
router.post("/create", createSession);

export default router;
