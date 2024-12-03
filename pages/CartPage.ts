import { expect, Locator, Page } from "@playwright/test";
import { convertPriceToNumber } from "../helpers/utils";

export default class CartPage {
  private productsNamesLocator: Locator;
  private productsPricesLocator: Locator;
  private subtotalLocator: Locator;
  private totalLocator: Locator;

  constructor(protected page: Page) {
    this.productsNamesLocator = this.page.locator(".product-name");
    this.productsPricesLocator = this.page.locator(".product-price");
    this.subtotalLocator = this.page.locator('[data-title="Subtotal"]').last();
    this.totalLocator = this.page.locator('[data-title="Total"]');
  }

  public async verifyProductInCart(name: string, price: string) {
    await expect(
      this.productsNamesLocator.filter({ hasText: name })
    ).toBeVisible();
    await expect(
      this.productsPricesLocator.filter({ hasText: price })
    ).toBeVisible();
  }

  public async validateSubtotalUpdate(shippingMethodLocator: Locator) {
    const priceInString = await shippingMethodLocator
      .locator(".woocommerce-Price-amount")
      .textContent();
    if (priceInString) {
      const subtotalInString = await this.subtotalLocator.textContent();
      const shippingPrice = convertPriceToNumber(priceInString);
      const subtotalPrice = convertPriceToNumber(subtotalInString);
      const totalPriceExpected = shippingPrice + subtotalPrice;
      await this.page.waitForTimeout(1000);
      const totalInString = await this.totalLocator
        .locator(".woocommerce-Price-amount.amount")
        .textContent();
      const totalPrice = convertPriceToNumber(totalInString);
      expect(totalPrice).toEqual(totalPriceExpected);
    }
  }
}
