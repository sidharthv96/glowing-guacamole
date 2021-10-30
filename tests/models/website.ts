import { Page } from "@playwright/test";
import { ProductPage } from "./productPage";
import { PageDetails } from "./types";

export class Website {
  private readonly productPage: ProductPage;
  constructor(private readonly page: Page) {
    this.productPage = new ProductPage(page);
  }

  async scrapeAllProducts(url: string): Promise<PageDetails[]> {
    await this.page.goto(url);
    const { navLinks } = await this.productPage.scrapeDetails(url);
    const details: PageDetails[] = [];
    const links: string[] = navLinks;
    for (const link of links) {
      const data = await this.productPage.scrapeDetails(link);
      details.push(data);
      links.push(...data.navLinks.filter((x) => !links.includes(x)));
    }
    return details;
  }
}
