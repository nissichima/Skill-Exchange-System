import express from "express";
import {createSkill, findSkill} from "../Controllers/skill.controller.js";


const router = express.Router();

router.post("/create", createSkill);
router.post("/find", findSkill);