import express from "express";
import {updateProfile} from "../Controllers/profile.controller.js"

const router = express.Router();

router.patch("/update", updateProfile); 

export default router;
