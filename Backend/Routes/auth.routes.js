import express from "express";
import { signup, login, logout, requestPasswordReset, resetPassword } from "../Controllers/auth.controller.js";
import path from "path";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/password-reset", requestPasswordReset);
router.post("/password-reset/:token", resetPassword);
router.get("/password-reset/:token", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/reset-password.html")); // Adjust path if needed
});

export default router;
