import { test, expect } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import AccessoriesPage from "../pages/AccessoriesPage";

test("Validate shopping flow", async ({ page }) => {
  const accessoriesPage = new AccessoriesPage(page);

  await page.goto(ApplicationURL.BASE_URL);
  await page.getByRole("link", { name: "Accessories", exact: true }).click();

  // Wait for no more network requests
  await page.waitForLoadState("networkidle");

  const productSortLowToHigh = await accessoriesPage.getAllProducts();
  productSortLowToHigh.sort((a, b) => a.price - b.price);
  await accessoriesPage.verifySorting(productSortLowToHigh);

  await page
    .locator("#main")
    .getByRole("link", { name: "Buddha Bracelet" })
    .click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "View cart" }).click();
  // await page.getByLabel("Registered Mail (5 - 8 days").check();
  // await page.getByRole("link", { name: "Proceed to checkout" }).click();
  // await page.getByRole("textbox", { name: "First name *" }).click();
  // await page.getByRole("textbox", { name: "First name *" }).fill("M");
  // await page.getByRole("textbox", { name: "Last name *" }).click();
  // await page.getByRole("textbox", { name: "Last name *" }).fill("A");
  // await page.getByRole("textbox", { name: "Street address *" }).click();
  // await page.getByRole("textbox", { name: "Street address *" }).fill("D");
  // await page.getByRole("textbox", { name: "Postcode / ZIP *" }).click();
  // await page.getByRole("textbox", { name: "Postcode / ZIP *" }).fill("7");
  // await page.getByRole("textbox", { name: "Town / City *" }).click();
  // await page.getByRole("textbox", { name: "Town / City *" }).press("CapsLock");
  // await page.getByRole("textbox", { name: "Town / City *" }).fill("A");
  // await page.getByLabel("Phone *").dblclick();
  // await page.getByLabel("Phone *").fill("0");
  // await page.getByLabel("Email address *").dblclick();
  // await page.getByLabel("Email address *").fill("t");
  // await page.getByRole("button", { name: "Place order" }).click();
});
