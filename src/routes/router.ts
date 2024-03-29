import express from "express";
import scraperRouter from "./scraperRouter";
import emailController from "../controllers/emailController";
const router = express.Router();

router.use("/scraper", scraperRouter);
router.get("/email-send-test", emailController.sendTestEmail);

export default router;
