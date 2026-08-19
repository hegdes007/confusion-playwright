import { When, Then } from "@cucumber/cucumber";
import { request, expect } from "playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Then("I click on Menu link in Navigation bar", async function () {
  await pageFixture.page.locator("#Navbar ul li").nth(2).click();
});

Then("I should navigate to Menu page", async function () {
  await expect(pageFixture.page).toHaveURL(/menu\.html/);
});

Then("I should see breadcrumb in Menu page", async function () {
  await expect(pageFixture.page.locator(".breadcrumb")).toBeVisible();
});

Then("I should see {string} dishes in Menu Page", async function (totalDishes) {
  await expect(pageFixture.page.locator(".dish")).toHaveCount(
    parseInt(totalDishes),
  );
});

Then("I should see image for every dish in Menu Page", async function () {
  pageFixture.page.waitForTimeout(500);
  for (const dish of await pageFixture.page.locator(".dish").all()) {
    await expect(dish.locator(".img-thumbnail")).toBeVisible();
  }
});

When("There is an API Error", async function () {
  await pageFixture.page.route("**/api/json/v1/**", async (route) => {
    await route.abort();
  });
});

Then("I should see the Error Message in Menu Page", async function () {
  await expect(pageFixture.page.locator("#error h3")).toBeVisible();
  await expect(pageFixture.page.locator("#error h3")).not.toBeEmpty();
});

When("I hit the API I should see API resonse status as 200", async function () {
  const apiContext = await request.newContext();
  const response = await apiContext.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=India",
  );
  expect(response.status()).toBe(200);
  await apiContext.dispose();
});

Then("Check the length of the meals array", async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=India",
  );
  const body = await response.json();

  expect(body).toHaveProperty("meals");
  expect(Array.isArray(body.meals)).toBe(true);

  expect(body.meals.length).toBeGreaterThan(0);
  console.log(`The length of the meals array is: ${body.meals.length}`);
  await apiContext.dispose();
});
