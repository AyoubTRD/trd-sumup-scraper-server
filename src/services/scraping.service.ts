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

    const context = await this.browser!.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(productUrl);

    const btn = await page.waitForSelector("#go-to-checkout");
    await btn?.click();
    await sleep(800);

    let url = page.url();

    if (!url.includes("checkout")) {
      await page.waitForNavigation({ waitUntil: "networkidle2" });
      url = page.url();
    }

    page.close();
    context.close();

    return url;
  }
}
