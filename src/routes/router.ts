import express from "express";
import scraperRouter from "./scraperRouter";
const router = express.Router();

router.use("/scraper", scraperRouter);

export default router;
