import express from "express";

import { 
    chatController 
} from "../controllers/chat.controller.js";

import {
    historyController
} from "../controllers/history.controller.js";


const router = express.Router();


router.post(
    "/chat",
    chatController
);


router.get(
    "/history",
    historyController
);


export default router;