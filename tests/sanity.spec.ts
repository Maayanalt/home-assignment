import { test, expect } from "@playwright/test";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ApplicationURL from "../helpers/ApplicationURL";
import AccessoriesPage from "../pages/AccessoriesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

test("Validate shopping flow", async ({ page }) => {
  await page.goto(ApplicationURL.BASE_URL);
  await page.getByRole("link", { name: "Accessories", exact: true }).click();

  const accessoriesPage = new AccessoriesPage(page);
  // Wait for no more network requests
  await page.waitForLoadState("networkidle");

  const productSortLowToHigh = await accessoriesPage.getAllProducts();
  productSortLowToHigh.sort((a, b) => a.price - b.price);
  await accessoriesPage.verifySorting(productSortLowToHigh);

  const cheapestProduct = productSortLowToHigh[0];
  await page
    .locator("#main")
    .getByRole("link", { name: `${cheapestProduct.name}` })
    .click();
  const productDetailsPage = new ProductDetailsPage(page);
  const productName = await productDetailsPage.getNameInString();
  const productPrice = await productDetailsPage.getPriceInString();
  await page.getByRole("button", { name: "Add to cart" }).click();

  await page.getByRole("link", { name: "View cart" }).click();
  const cartPage = new CartPage(page);
  await cartPage.verifyProductInCart(productName, productPrice);

  await page.getByLabel("Registered Mail (5 - 8 days)").check();
  const methodLocator = page.locator(
    'label:has-text("Registered Mail (5 - 8 days)")'
  );
  await cartPage.validateSubtotalUpdate(methodLocator);
  await page.getByRole("link", { name: "Proceed to checkout" }).click();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillMandatoryFields(
    "Maayan",
    "Alt",
    "Israel",
    "Dov 13",
    "7876543",
    "Ashkelon",
    "052-7863423",
    "test@gmail.com"
  );
  await checkoutPage.placeOrder();
});
