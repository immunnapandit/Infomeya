import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 1400 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

const result = await page.evaluate(() => {
  function describe(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return null;
    return { x, y, tag: el.tagName, cls: el.className, src: el.src || null };
  }
  const aboutArea = document.querySelector('.tv-about2-area');
  const aboutCs = getComputedStyle(aboutArea);
  return {
    aboutAreaOverflow: aboutCs.overflow,
    aboutAreaRect: aboutArea.getBoundingClientRect(),
    points: [
      describe(900, 500),
      describe(900, 600),
      describe(900, 700),
      describe(900, 900),
      describe(900, 1100),
      describe(900, 1300),
    ],
  };
});
console.log(JSON.stringify(result, null, 2));

await browser.close();
