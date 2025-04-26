const puppeteer = require("puppeteer");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cookies = require("../env/cookies.json"); // Load cookies from a JSON file

const url = "https://www.zhihu.com/"; // Replace with your target URL
const hotUrl = "https://www.zhihu.com/hot"; // Replace with your target URL for hot topics
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 },
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({ path: "out/images/sign.png" });

    await page.setCookie(...cookies);

    await page.goto(hotUrl, { waitUntil: "networkidle2" });
    await page.screenshot({ path: "out/images/hot.png" });

    await sleep(5 * 1000);
    await browser.close();
})();
