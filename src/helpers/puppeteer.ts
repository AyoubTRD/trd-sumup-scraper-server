import { launch, Browser } from "puppeteer";

let cachedBrowser: Browser | null = null;

export const getBrowser = async () => {
  if (!cachedBrowser) cachedBrowser = await launch();

  return cachedBrowser;
};
