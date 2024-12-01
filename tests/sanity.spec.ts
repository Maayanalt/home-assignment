import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://atid.store/");
  await page.getByRole("link", { name: "Accessories", exact: true }).click();
  await page.getByLabel("Shop order").selectOption("price");
  await page.goto(
    "https://atid.store/product-category/accessories/?orderby=price"
  );
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
