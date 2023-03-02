const puppeteer = require('puppeteer');

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto("https://www.google.co.kr");

  await page.evaluate(() => {
    // input창 찾아서
    // 버튼 클릭
    document.querySelector(".gLFyf").value="치킨";
    document.querySelector(".gNO89b").click();
  })

  // 페이지 이동전에 스크린샷이 찍히므로
  // wiatForSelecot를 응용해서 대기후 스크린샷을 찍는다.
  await page.waitForSelector(".GLcBOb");

  // 이동된 페이지니까 스크린샷을 찍는다.
  await page.screenshot({path:"치킨.jpg", fullPage:true});
};

main();