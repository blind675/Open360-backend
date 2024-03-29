import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { timeout } from "../utils";
import { NewProject } from "../types";

export async function scrapeProject(url: string): Promise<NewProject> {
  const username = String(process.env.SCRAPER_BRIGHT_DATA_USERNAME);
  const password = String(process.env.SCRAPER_BRIGHT_DATA_PASSWORD);
  const SBR_WS_ENDPOINT = `wss://${username}:${password}@brd.superproxy.io:9222`;

  console.log("Connecting to Scraping Browser...");
  // const browser = await puppeteer.launch({
  //   // browserWSEndpoint: SBR_WS_ENDPOINT,
  //   args: [
  //     "--disable-setuid-sandbox",
  //     "--no-sandbox",
  //     "--single-process",
  //     "--no-zygote",
  //   ],
  //   executablePath:
  //     process.env.NODE_ENV === "production"
  //       ? process.env.PUPPETEER_EXECUTABLE_PATH
  //       : puppeteer.executablePath(),
  // });

  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });

  try {
    console.log("Connected! Navigating...");
    const page = await browser.newPage();
    await page.goto(url);
    console.log("Navigated! Wait for page to load...");
    await timeout(1000);
    console.log("Loaded! Scraping page content...");
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    const title = $("a.sc-jhAzac span").text().trim();
    const iconImg = $("img.sc-kkGfuU").attr("src");
    const tagLine = $(".project-home-page__description").text().trim();
    const description = $(".project-home-page__about-text .markdown p")
      .text()
      .trim();
    const backgroundImg = $(".project-background")
      ?.attr("style")
      ?.match(/url\("(.*?)"/)?.[1];
    const progress = $(".project-metadata-status-bar")
      .last()
      .text()
      .trim()
      .match(/\d+/)?.[0];

    const project: NewProject = {
      url,
      title,
      iconImg,
      tagLine,
      description,
      backgroundImg,
      progress,
      followersEmails: [],
    };

    console.log("Scraped!");

    return project;
  } finally {
    console.log("Closing browser...");
    await browser.close();
  }
}
