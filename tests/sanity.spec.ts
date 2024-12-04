import { test, expect } from "@playwright/test";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ApplicationURL from "../helpers/ApplicationURL";
import AccessoriesPage from "../pages/AccessoriesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

test("Validate shopping flow", async ({ page }) => {
  // Navigate to the application
  await page.goto(ApplicationURL.BASE_URL);

  // Navigate to Accessories Page
  await page.getByRole("link", { name: "Accessories", exact: true }).click();
  const accessoriesPage = new AccessoriesPage(page);
  // Wait for no more network requests
  await page.waitForLoadState("networkidle");

  // Fetch and verify sorted product list
  const productSortLowToHigh = await accessoriesPage.getAllProducts();
  productSortLowToHigh.sort((a, b) => a.price - b.price);
  await accessoriesPage.verifySorting(productSortLowToHigh);

  // Select the cheapest product and navigate to its details page
  const cheapestProduct = productSortLowToHigh[0];
  await page
    .locator("#main")
    .getByRole("link", { name: `${cheapestProduct.name}` })
    .click();

  // Add product to cart
  const productDetailsPage = new ProductDetailsPage(page);
  const productName = await productDetailsPage.getNameInString();
  const productPrice = await productDetailsPage.getPriceInString();
  await page.getByRole("button", { name: "Add to cart" }).click();

  // Verify product in cart
  await page.getByRole("link", { name: "View cart" }).click();
  const cartPage = new CartPage(page);
  await cartPage.verifyProductInCart(productName, productPrice);

  // Select shipping method and verify subtotal update
  await page.getByLabel("Registered Mail (5 - 8 days)").check();
  const methodLocator = page.locator(
    'label:has-text("Registered Mail (5 - 8 days)")'
  );
  await cartPage.validateSubtotalUpdate(methodLocator);

  // Proceed to checkout
  await page.getByRole("link", { name: "Proceed to checkout" }).click();

  // Fill checkout form
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

  // Place order
  await checkoutPage.placeOrder();
});
