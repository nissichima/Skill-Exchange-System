import express from "express";
import  {signup, login, logout, requestPasswordReset, resetPassword } from "../Controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.post("/password-reset", requestPasswordReset);
router.post("/password-reset/:token", resetPassword);

export default router;