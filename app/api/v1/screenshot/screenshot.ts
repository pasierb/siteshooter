import puppeteer from 'puppeteer';

/**
 * TODO:
 * - close cookie banners
 * - inject custom css class
 */


export async function screenshot({ url, width, height }: { url: URL, width: number, height: number }) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url.toString());

  // Set screen size
  await page.setViewport({width, height});

  const image = await page.screenshot();

  await browser.close();

  return image;
}
