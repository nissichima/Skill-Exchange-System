import express from "express";
import  {sendMessage, getMessage} from "../Controllers/message.controller.js"
import checkId from "../Middleware/checkId.js";

const router = express.Router();

router.post("/send/:id", checkId, sendMessage);
router.get("/:id", checkId, getMessage);

export default router;