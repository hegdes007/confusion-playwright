import { When, Then } from "@cucumber/cucumber";
import { request, expect } from "playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Then("I should see the moving Carousel Items", async function () {
  await expect(pageFixture.page.locator("#mycarousel")).toBeVisible();
});

Then("There should be {string} Carousel Items", async function (count) {
  await expect(pageFixture.page.locator(".carousel-item")).toHaveCount(count);
});

Then("I should see the {string} Row on Home Page", async function (rowName) {
  await expect(
    pageFixture.page.locator(".row", { hasText: rowName }),
  ).toBeVisible();
});

Then("Executive Chef name should be {string}", async function (chefName) {
  await expect(
    pageFixture.page.locator(".row").nth(8).locator(".media-body h2"),
  ).toHaveText(chefName);
});

Then(
  "I should see the list of the navigation links in the bottom of home page",
  async function () {
    await expect(pageFixture.page.locator(".offset-1")).toBeVisible();
  },
);

Then("Its heading should be {string}", async function (heading) {
  await expect(pageFixture.page.locator(".offset-1 h5")).toHaveText(heading);
});

Then("I should see {string} links in the list", async function (listLength) {
  await expect(pageFixture.page.locator(".offset-1 ul li")).toHaveCount(
    listLength,
  );
});

Then("I should see the dish in home page", async function () {
  await expect(pageFixture.page.locator(".row").nth(8)).toBeVisible();
});

Then("I should see a {string} label in Red color", async function (label) {
  const badge = pageFixture.page.locator(".row .badge-danger").nth(2);

  await expect(badge).toBeVisible();
  await expect(badge).toHaveText(label);
  await expect(badge).toHaveCSS("background-color", "rgb(220, 53, 69)");
});

Then(
  "I should see a {string} price tag in Grey color",
  async function (priceTag) {
    const badge = pageFixture.page.locator(".row .badge-secondary");

    await expect(badge).toBeVisible();
    await expect(badge).toHaveText(priceTag);
    await expect(badge).toHaveCSS("background-color", "rgb(108, 117, 125)");
  },
);

Then("I should see the Login Button in Home Page", async function () {
  await expect(pageFixture.page.locator("#loginButton")).toBeVisible();
});

When(
  "I click on Login Button I should see Login Modal Open",
  async function () {
    await pageFixture.page.locator("#loginButton").click();
    await expect(pageFixture.page.locator(".modal-dialog")).toBeVisible();
  },
);

Then("I type Username and Password", async function (dataTable) {
  await pageFixture.page
    .locator("#exampleInputEmail3")
    .type(dataTable.rawTable[1][0]);
  await pageFixture.page
    .locator("#exampleInputPassword3")
    .type(dataTable.rawTable[1][1]);
});

Then("Clicking on Sign In closes the Modal", async function () {
  await pageFixture.page.locator(".btn-primary").nth(0).click();
  await expect(pageFixture.page.locator(".modal-dialog")).not.toBeVisible();
});

Then("I should see the Reserve Table Button in Home Page", async function () {
  await expect(pageFixture.page.locator("#reserveButton")).toBeVisible();
});

When(
  "I click on Reserve Table Button I should see Reserve Table Modal Open",
  async function () {
    await pageFixture.page.locator("#reserveButton").click();
    await expect(pageFixture.page.locator(".modal-dialog")).toBeVisible();
  },
);

Then("I should click to choose the Number Of Guests", async function () {
  await pageFixture.page.locator(".row").nth(1).locator("#1").click();
});

Then("I should type the Date and Time", async function (dataTable) {
  await pageFixture.page
    .locator("#date.form-control")
    .type(dataTable.rawTable[1][0]);
  await pageFixture.page
    .locator("#time.form-control")
    .type(dataTable.rawTable[1][1]);
});

Then("Clicking on Reserve closes the Reserve Table Modal", async function () {
  await pageFixture.page.locator(".btn-primary").nth(1).click();
  await expect(pageFixture.page.locator(".modal-dialog")).not.toBeVisible();
});
