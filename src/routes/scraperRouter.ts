import express from "express";
import scraperController from "../controllers/scraperController";

const scraperRouter = express.Router();

scraperRouter.route("/").post(scraperController.scrape);
scraperRouter.get("/", scraperController.scrape);

export default scraperRouter;
