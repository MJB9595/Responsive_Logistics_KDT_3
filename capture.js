import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(`[Browser Console]: ${msg.text()}`));
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(2000);
  await browser.close();
})();
