import { Page } from "@playwright/test";
import { PageDetails, ProductDetails } from "./types";

export class ProductPage {
  constructor(private readonly page: Page) {}

  async scrapeDetails(url: string): Promise<PageDetails> {
    const websiteURL = new URL(url);
    const domain = `${websiteURL.protocol}//${websiteURL.hostname}`;
    console.log(`Scraping ${url}`);
    await this.page.goto(url);
    const thumbnails = this.page.locator(".thumbnail");
    let count = await thumbnails.count();

    const details: ProductDetails[] = [];
    for (let i = 0; i < count; i++) {
      const element = thumbnails.nth(i);
      const title = await element.locator(".title").getAttribute("title");
      const link =
        domain + (await element.locator(".title").getAttribute("href"));
      const description = await element.locator(".description").textContent();
      const price = await element.locator(".price").textContent();
      const data = {
        title,
        link,
        description,
        price,
      };
      details.push(data);
    }

    const sideMenuLinks = this.page.locator("#side-menu a");
    count = await sideMenuLinks.count();
    const links: string[] = [];
    for (let i = 0; i < count; i++) {
      const element = sideMenuLinks.nth(i);
      links.push(domain + (await element.getAttribute("href")));
    }
    console.log(`Got ${details.length} products.`);

    return {
      url,
      products: details,
      navLinks: links,
    };
  }
}
