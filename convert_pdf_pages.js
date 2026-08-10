import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1697, deviceScaleFactor: 2 });
  const filePath = path.resolve('public/ebook/ebook-dlaczego-po-latach-partner-zaczy-nas-odpychac.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    await pages[i].screenshot({
      path: `public/ebook/preview_page_${i + 1}.png`
    });
  }
  await browser.close();
  console.log('Screenshots created successfully!');
})();
