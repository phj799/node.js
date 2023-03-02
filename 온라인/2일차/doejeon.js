const puppeteer = require("puppeteer");

const main = async() => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage();

  await page.goto("https://news.daum.net/digital#1");

  // 네이버 웹툰은 일부 비동기식으로 변경되어서
	// wairForSelector 메소드가 필요했지만
	// 이번엔 동기식이기 때문에 해당 메소드 필요없음~
  // await page.waitForSelector(".list_newsmajor .tit_g a");

  const data = await page.evaluate(() => {
    const article = document.querySelectorAll(".list_newsmajor .tit_g a");
    const result = Array.from(article).map(li => li.textContent);
    return result;
  })

  console.log(data);
};

main();