import { test } from "@playwright/test";
import { ProductPage } from "./productPage";
import { writeFileSync } from "fs";
test("Single Page Scrape", async ({ page }) => {
  const baseURL = "https://webscraper.io";
  const productPage = new ProductPage(page);
  const productDetails = await productPage.scrapeDetails(
    `${baseURL}/test-sites/e-commerce/allinone`
  );
  writeFileSync("out.json", JSON.stringify(productDetails, null, 2));
});
