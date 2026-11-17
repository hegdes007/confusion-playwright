import { Then } from "@cucumber/cucumber";
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
