import asyncHandler from "express-async-handler";
import Project from "../db/models/project.model";
import { connectToDatabase } from "../db/mongoose";
import { scrapeProject } from "../services/scraperService";

const scrape = asyncHandler(async (req, res, next) => {
  try {
    const projectURL = req.body?.url;
    if (!projectURL) {
      res.status(400).send("No project URL param provided");
    }

    const scrapedProject = await scrapeProject(projectURL);

    console.log("Connecting to database...");
    await connectToDatabase();

    console.log("Saving or updating project...");
    await Project.findOneAndUpdate(
      { url: scrapedProject.url },
      scrapedProject,
      {
        upsert: true,
        new: true,
      }
    );
    res.send("success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error scraping project: " + error);
  }
});

const scraperController = {
  scrape,
};

export default scraperController;
