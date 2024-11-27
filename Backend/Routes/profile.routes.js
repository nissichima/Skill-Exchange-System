import express from "express";
import {updateProfile} from "../Controllers/profile.controller.js"
import checkId from "../Middleware/checkId.js";

const router = express.Router();

router.patch("/update", checkId, updateProfile); 

export default router;
