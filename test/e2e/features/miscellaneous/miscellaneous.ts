import { When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
const path = require("path");
const fs = require("fs");

When("I vist the Alert Page", async function () {
  await pageFixture.page.goto(
    "http://the-internet.herokuapp.com/javascript_alerts",
  );
});

Then("Handling JS Alert - Validate Alert Text and Click OK", async function () {
  pageFixture.page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("I am a JS Alert");
    await dialog.accept();
  });
  await pageFixture.page.getByText("Click for JS Alert").click();
  await expect(pageFixture.page.locator("#result")).toHaveText(
    "You successfully clicked an alert",
  );
});

Then(
  "Handling JS Confirm - Validate Confirm Text and Click OK",
  async function () {
    pageFixture.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("I am a JS Confirm");
      await dialog.accept();
    });
    await pageFixture.page.getByText("Click for JS Confirm").click();
    await expect(pageFixture.page.locator("#result")).toHaveText(
      "You clicked: Ok",
    );
  },
);

Then("Handling JS Confirm - Click Cancel", async function () {
  pageFixture.page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("I am a JS Confirm");
    await dialog.dismiss();
  });
  await pageFixture.page.getByText("Click for JS Confirm").click();
  await expect(pageFixture.page.locator("#result")).toHaveText(
    "You clicked: Cancel",
  );
});

Then(
  "Handling JS Prompt - Input text in prompt, Click OK and Validate Input Text",
  async function () {
    pageFixture.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("I am a JS prompt");
      await dialog.accept("This is a test Text");
    });
    await pageFixture.page.getByText("Click for JS Prompt").click();
    await expect(pageFixture.page.locator("#result")).toHaveText(
      "You entered: This is a test Text",
    );
  },
);

When("I vist the File Upload-Download Page", async function () {
  await pageFixture.page.goto(
    "https://playwrightlab.github.io/#uploads-downloads",
  );
});

Then("I should be able to upload a file", async function () {
  const filePath = path.join(
    __dirname,
    "../../files/Playwright_Cheat-Sheet.pdf",
  );
  await pageFixture.page.locator("#singleFileInput").setInputFiles(filePath);
  await expect(
    pageFixture.page.getByTestId("file-item-Playwright_Cheat-Sheet.pdf"),
  ).toBeVisible();
  await pageFixture.page.locator("#singleUploadBtn").click();
  await expect(pageFixture.page.locator("#singleUploadStatus")).toBeVisible();
});

Then("I should be able to upload multiple files", async function () {
  const filesPath = [
    path.join(__dirname, "../../files/Playwright_Cheat-Sheet.pdf"),
    path.join(__dirname, "../../files/Playwright_Cheat-Sheet_copy.pdf"),
  ];
  await pageFixture.page.locator("#multiFileInput").setInputFiles(filesPath);
  await expect(
    pageFixture.page.getByTestId("file-item-Playwright_Cheat-Sheet.pdf").last(),
  ).toBeVisible();
  await expect(
    pageFixture.page.getByTestId("file-item-Playwright_Cheat-Sheet_copy.pdf"),
  ).toBeVisible();
  await pageFixture.page.locator("#multiUploadBtn").click();
  await expect(pageFixture.page.locator("#multiUploadStatus")).toBeVisible();
});

Then("I should be able to download a file", async function () {
  const downloadPromise = pageFixture.page.waitForEvent("download");
  await pageFixture.page.locator("#downloadPdfBtn").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain(".pdf");
  const filePath = path.join(
    __dirname,
    "../../files",
    download.suggestedFilename(),
  );
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBeTruthy();
});

When("I vist the Window Handling Page", async function () {
  await pageFixture.page.goto("https://playwrightlab.github.io/#frames");
});

Then("I should be able to handle New Tab", async function () {
  const newTabPromise = pageFixture.context.waitForEvent("page");
  await pageFixture.page.locator("#newTabBtn").click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  await expect(newTab.locator("#loginWrapper")).toBeVisible();
  await newTab.close();
});

Then("I should be able to handle Popup Window", async function () {
  const newPopupPromise = pageFixture.page.waitForEvent("popup");
  await pageFixture.page.locator("#popupBtn").click();
  const newPopup = await newPopupPromise;
  await newPopup.waitForLoadState();
  await expect(newPopup.locator("#loginWrapper")).toBeVisible();
  await newPopup.close();
});
