import { When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Then("I click on About link", async function () {
  await pageFixture.page.locator("#Navbar ul li").nth(1).click();
});

Then("I should be in About Page", async function () {
  await expect(pageFixture.page).toHaveURL(/aboutus\.html/);
});

Then("I should see {string} heading", async function (heading) {
  await expect(pageFixture.page.getByText(heading)).toBeVisible();
});

Then("I should see {string} leaders name", async function (count) {
  await expect(pageFixture.page.locator("#accordion .card")).toHaveCount(
    parseFloat(count),
  );
});

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
