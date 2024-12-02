import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../types/product";
import { convertPriceToNumber } from "../helpers/utils";
import { console } from "inspector";

export default class CartPage {
  private productsNamesLocator: Locator;
  private productsPricesLocator: Locator;
  constructor(protected page: Page) {
    this.productsNamesLocator = this.page.locator(".product-name");
    this.productsPricesLocator = this.page.locator(".product-price");
  }

  public async verifyProductInCart(name: string, price: string) {
    await expect(
      this.productsNamesLocator.filter({ hasText: name })
    ).toBeVisible();
    await expect(
      this.productsPricesLocator.filter({ hasText: price })
    ).toBeVisible();
  }
}
