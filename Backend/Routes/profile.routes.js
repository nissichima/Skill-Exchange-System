import express from "express";
import {updateProfile} from "../Controllers/profile.controller.js"
import checkId from "../Middleware/checkId.js";

const router = express.Router();

// Add the getProfile route
router.patch("/update", checkId, updateProfile);

export default router;
