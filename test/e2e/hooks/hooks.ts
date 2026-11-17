import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  webkit,
  Page,
} from "playwright";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(10000);

BeforeAll(async function () {
  const headless = process.env.HEADLESS !== "false";

  const browserName = process.env.BROWSER_NAME || "chromium";

  const browsers = {
    chromium,
    firefox,
    webkit,
  };

  browser = await browsers[browserName as keyof typeof browsers].launch({
    headless,
  });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  pageFixture.page = page;
});

After(async function () {
  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
