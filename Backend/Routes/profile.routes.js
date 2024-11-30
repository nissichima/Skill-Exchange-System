import express from "express";
import {updateProfile, getProfile} from "../Controllers/profile.controller.js"
import checkId from "../Middleware/checkId.js";

const router = express.Router();

// Add the getProfile route
router.patch("/update", checkId, updateProfile);
router.get("/get", checkId, getProfile);

export default router;
