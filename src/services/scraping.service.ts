import { Browser } from "puppeteer";
import { getBrowser } from "../helpers/puppeteer";
import { sleep } from "../helpers/sleep";

export class ScrapingService {
  private browser?: Browser;

  private initCalled = false;

  async init() {
    if (this.initCalled) return;
    this.initCalled = true;

    this.browser = await getBrowser();
  }

  async getSumUpBuyLink(productUrl: string): Promise<string | null> {
    if (!this.browser) await this.init();

    console.time("Create incognito context");
    const context = await this.browser!.createIncognitoBrowserContext();
    console.timeEnd("Create incognito context");

    console.time("New page");
    const page = await context.newPage();
    console.timeEnd("New page");

    console.time("Open product page");
    await page.goto(productUrl, {
      waitUntil: "networkidle2",
    });
    console.timeEnd("Open product page");

    console.time("Click on checkout button");
    await page.click("#go-to-checkout");
    console.timeEnd("Click on checkout button");
    await sleep(2000);

    let url = page.url();

    if (!url.includes("checkout")) {
      console.log("Checkout url not ready: ", url);

      console.time("Navigation to checkout page");
      await page.waitForNavigation({ waitUntil: "networkidle2" });
      console.timeEnd("Navigation to checkout page");

      url = page.url();
    }

    page.close();
    context.close();

    return url;
  }
}
