import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import puppeteer from 'puppeteer';
import axios from "axios";
import rateLimit from "express-rate-limit";
import serverless from "serverless-http";

const app = express();
const PORT = process.env.port || 5000;
dotenv.config();

app.set("trust proxy", 1);

app.use(cors());

const SCRAPING_URL = process.env.VITE_SCRAPING_WEBSITE;
const PLAT_PRICES_URL = process.env.VITE_PLAT_PRICES_URL;
const PLAT_PRICES_API_KEY = process.env.VITE_PLAT_PRICES_API_KEY;

const limiterScraper = rateLimit({
  windowMs: 10 * 1000,
  max: 1, // 1 request per 10 seconds of each user
})

const limiterPlatPrices = rateLimit({
  windowMs: 10 * 1000,
  max: 20, //20 requests per 10 seconds
})

app.use('/api/psplusgames', limiterScraper);
app.use('/api/platprices', limiterPlatPrices);

app.get('/api/psplusgames', async (req, res) => {
  const psplusgame = await run();
  res.send(psplusgame);
})

app.get('/api/platprices', async (req, res) => {
  try {
    const response = await axios.get(`${PLAT_PRICES_URL}`, {
      params: {
        key: PLAT_PRICES_API_KEY,
        name: req.query.name,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT , () => {
  console.log(`Server running on port ${PORT}`)
})

export const handler = serverless(app);

const run = async () => {
  let browser;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    await page.goto(`${SCRAPING_URL}`);

    const extractedData = await page.evaluate(() => {
      const aTags = document.querySelectorAll('div.games-filtered ul.games-style-list li a');
      const lastTagElement = document.querySelector('div.games-filtered ul.games-style-list li.last a')

      const data = [];
      aTags.forEach((aTag) => {
        data.push(aTag.textContent.trim());
      });

      const uniqueData = [...new Set(data)];

      const lastTag = lastTagElement.textContent.trim();
      const cutOffIndex = uniqueData.findIndex(index => index === lastTag);

      const options = {
        All: uniqueData,
        Extra: uniqueData.slice(0, cutOffIndex + 1),
        Premium: uniqueData.slice(cutOffIndex + 1)
      }

      return options;
    });

    console.log('Fetching done')

    await browser.close();

    return extractedData;
  } catch (error) {
    console.log("scraping failed", error);
  } finally {
    browser?.close();
  }
}
