import { test } from "@playwright/test";
import { ProductPage } from "./models/productPage";
import { writeFileSync } from "fs";
import { Website } from "./models/website";
test("Single Page Scrape", async ({ page }) => {
  const baseURL = "https://webscraper.io/test-sites/e-commerce/allinone";
  const website = new Website(page);
  // console.log(await website.scrapeAllProducts(baseURL));
  // const productPage = new ProductPage(page);
  const productDetails = await website.scrapeAllProducts(baseURL);
  writeFileSync("out.json", JSON.stringify(productDetails, null, 2));
});
