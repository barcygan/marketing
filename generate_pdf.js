import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const filePath = path.resolve('public/ebook/ebook-dlaczego-po-latach-partner-zaczy-nas-odpychac.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: 'public/ebook/ebook-dlaczego-po-latach-partner-zaczy-nas-odpychac.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
})();
