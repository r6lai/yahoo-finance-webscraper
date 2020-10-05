const puppeteer = require('puppeteer');

async function scrapeStock(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="quote-header-info"]/div[2]/div[1]/div[1]/h1');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('//*[@id="quote-header-info"]/div[3]/div[1]/div/span[1]');
    const text1 = await el2.getProperty('textContent');
    const price = await text1.jsonValue();

    const [el3] = await page.$x('//*[@id="quote-header-info"]/div[3]/div[1]/div/span[2]');
    const text2 = await el3.getProperty('textContent');
    const change = await text2.jsonValue();

    const [el4] = await page.$x('//*[@id="quote-summary"]/div[1]/table/tbody/tr[7]/td[2]/span');
    const text3 = await el4.getProperty('textContent');
    const volume = await text3.jsonValue();

    const [el5] = await page.$x('//*[@id="quote-summary"]/div[2]/table/tbody/tr[1]/td[2]/span');
    const text4 = await el5.getProperty('textContent');
    const cap = await text4.jsonValue();

    browser.close();

    console.log({name, price, change, volume, cap})

    return {name, price, change, volume, cap}

}

module.exports = {
    scrapeStock
}
