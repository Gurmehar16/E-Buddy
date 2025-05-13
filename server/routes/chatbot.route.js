import express from 'express';
import { sendMessageToBot } from '../controllers/chatbot.controller.js';
import { handleDialogflowWebhook } from '../controllers/chatbot.controller.js';

const router = express.Router();
router.post('/send-message', sendMessageToBot);
router.post("/webhook", handleDialogflowWebhook);

export default router;
