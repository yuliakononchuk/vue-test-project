const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'data.json'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT || 8080)

const puppeteer = require('puppeteer');
const fs = require('fs');
const schedule = require('node-schedule');

const getEvents = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.wearepublic.nl/programma/?region=amsterdam-stad&region=haarlem&region=noord-holland&region=den-haag&region=delft&region=leiden&region=zuid-holland&genre=false&search=')
  await page.waitFor(5000);
  let prevLastElement = null;
  let currentLastElement = await page.evaluate(getLastElement);

  while (currentLastElement !== prevLastElement) {
    await page.evaluate(scrollPageDown);
    await page.waitFor(5000);
    prevLastElement = currentLastElement;
    currentLastElement = await page.evaluate(getLastElement);
  }

  const links = await page.evaluate(() => {
    const headers = document.querySelectorAll('.event-item__header .event-item__date');
    return Array.from(headers).map(item => item.getAttribute("href"))
  })

  const eventsData = await Promise.all(links.map(async link => {
    return await getData(link)
  }));

  const json = JSON.stringify({ data: eventsData });
  fs.writeFileSync('./data.json', json)

  await browser.close();

  function getLastElement() {
    const all = document.querySelectorAll('.event-item__header .event-item__date');
    return all[all.length - 1].getAttribute("href");
  }

  function scrollPageDown() {
    document.querySelector('.footer--membership').scrollIntoView()
  }

  async function getData(url) {
    const page = await browser.newPage()
    page.setDefaultTimeout(0)
    await page.goto(url).catch(e => console.error(e));
    const data = await page.evaluate(url => ({
      url: url,
      name: document.querySelector('.section__title').innerText,
      date: document.querySelector('.event-meta__date').innerText,
      location: document.querySelector('.event-meta__info li:nth-child(2)').innerText,
      likes: document.querySelector('.fav__counter').innerText,
      more_info: document.querySelector('.section__cta a').getAttribute("href")
    }), url).catch(e => console.error(e));
    return data;
  }
};

schedule.scheduleJob("40 * * * *", function () {
  console.log("Fetching started!");
  getEvents();
})