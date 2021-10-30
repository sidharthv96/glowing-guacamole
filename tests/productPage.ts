import { Page } from "@playwright/test";
export interface ProductDetails {
  title: string;
  link: string;
  description: string;
  price: string;
}

export class ProductPage {
  constructor(private readonly page: Page) {}

  async scrapeDetails(url: string): Promise<ProductDetails[]> {
    const websiteURL = new URL(url);
    const domain = websiteURL.protocol + websiteURL.hostname;
    await this.page.goto(url);
    const thumbnails = this.page.locator(".thumbnail");
    const count = await thumbnails.count();

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
    return details;
  }
}
