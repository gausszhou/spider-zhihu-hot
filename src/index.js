const fs = require('fs');
const puppeteer = require("puppeteer");
const { mkdir } = require("./utils");
const cookies = require("../env/cookies.json"); // Load cookies from a JSON file

const url = "https://www.zhihu.com/"; // Replace with your target URL
const hotUrl = "https://www.zhihu.com/hot"; // Replace with your target URL for hot topics
mkdir("out/images"); // Ensure the output directory exists
mkdir("out/data"); // Ensure the cookies directory exists
(async () => {
    console.log("Starting Puppeteer...");
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1280, height: 720 },
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({ path: "out/images/sign.png" });

    await page.setCookie(...cookies);

    await page.goto(hotUrl, { waitUntil: "networkidle2" });
    await page.screenshot({ path: "out/images/hot.png" });

    const hotLinks = await page.evaluate(() => {
        const links = [];
        Array.from(document.querySelectorAll('.HotList-list section')).forEach((ele) => {
            const $link = ele.querySelector('.HotItem-content a');
            if (!$link) return; // Skip if no link found
            const $img = ele.querySelector('.HotItem-img img');
            links.push({
                href: $link.href,
                title: $link.title,
                image: $img ? $img.src : null,
            });
        })
        return links;
    });
    fs.writeFileSync("out/data/hotLinks.json", JSON.stringify(hotLinks, null, 2), "utf-8");
    await browser.close();
    console.log("Puppeteer finished and browser closed.");
})();
