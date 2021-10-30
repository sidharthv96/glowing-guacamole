import { test } from "@playwright/test";
import { writeFileSync } from "fs";
import { Website } from "./models/website";
test("Single Page Scrape", async ({ page }) => {
  const baseURL = "https://webscraper.io/test-sites/e-commerce/allinone";
  const website = new Website(page);
  const productDetails = await website.scrapeAllProducts(baseURL);
  writeFileSync("out.json", JSON.stringify(productDetails, null, 2));
});
