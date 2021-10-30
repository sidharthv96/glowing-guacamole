import asyncio
from playwright.async_api import async_playwright, Page
from typing import List, Optional
from pydantic import BaseModel
import json

class ProductDetails(BaseModel):
    title: str
    link: str
    description: str
    price: str


class WebPageData(BaseModel):
    products: List[ProductDetails]
    url: str


async def scrapePage(page: Page, link: str) -> WebPageData:
    await page.goto(link)
    thumbnails = page.locator(".thumbnail")
    count = await thumbnails.count()
    products: List[ProductDetails] = []
    while(count >= 0):
        element = thumbnails.nth(count - 1)
        title = await element.locator(".title").get_attribute("title")
        link = "domain" + (await element.locator(".title").get_attribute("href"))
        description = await element.locator(".description").text_content()
        price = await element.locator(".price").text_content()
        product = ProductDetails(title=title, link=link, description=description, price=price)
        products.append(product)
        count -= 1
    return WebPageData(products=products, url=link)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        data = await scrapePage(page, "https://webscraper.io/test-sites/e-commerce/allinone")
        print(data.dict())

asyncio.run(main())