import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import puppeteer from 'puppeteer';
import rateLimit from 'express-rate-limit'
import axios from "axios";

const app = express();
const PORT = process.env.port || 5000;
dotenv.config();

const limiterScraper = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes paus
  max: 2, // Limit each IP to 1 requests per `window` scraping the website
})

const limiterPlatPrices = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes paus
  max: 500, // Limit each IP to 500 requests per hour
})

//app.use('/api/psplusgames', limiterScraper);
//app.use('/api/platprices', limiterPlatPrices);
app.set("trust proxy", 1);

app.use(cors());

const SCRAPING_URL = process.env.VITE_SCRAPING_WEBSITE;
const PLAT_PRICES_URL = process.env.VITE_PLAT_PRICES_URL;
const PLAT_PRICES_API_KEY = process.env.VITE_PLAT_PRICES_API_KEY;

//cache this respone for the next two weeks
app.get('/api/psplusgames', async (req, res) => {
  const psplusgame = await run();
  res.send(psplusgame);
})

//cache the value for the next day
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

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
