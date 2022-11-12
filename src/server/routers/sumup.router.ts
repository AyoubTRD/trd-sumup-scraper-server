import { Router } from "express";
import { ScrapingService } from "../../services/scraping.service";

const router = Router();

export const sumupRouter = router;

const scraper = new ScrapingService();

router.get("/checkout-link", async (req, res) => {
  const productUrl = req.query["productUrl"];
  if (!productUrl) {
    return res.status(400).send();
  }
  const url = await scraper.getSumUpBuyLink(productUrl as string);

  return res.send({
    data: {
      checkoutLink: url,
    },
  });
});
