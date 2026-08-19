import { When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/pageFixture";
import { expect } from "playwright/test";

When("I visit the {string} Page", async function (pageName) {
  await pageFixture.page.goto(
    `https://hegdes007.github.io/conFusion/${pageName}.html`,
  );
});

Then(
  "I should see Navigation Bar and links associated with it",
  async function () {
    await expect(pageFixture.page.locator("#Navbar")).toBeVisible();
  },
);

Then("I should see {string} link should be active", async function (navLink) {
  await expect(
    pageFixture.page.locator("#Navbar ul li", { hasText: navLink }),
  ).toContainClass("active");
});
