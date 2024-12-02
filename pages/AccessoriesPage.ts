import { expect, Locator, Page } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import { Product } from "../types/product";

export default class AccessoriesPage {
  private sortSelector: Locator;

  constructor(protected page: Page) {
    this.sortSelector = this.page.locator('[class="orderby"]');
  }

  public async sortProducts() {
    await this.sortSelector.selectOption("price");
    await this.page.goto(`${ApplicationURL.ACCESSORIES_URL}/?orderby=price`);
  }

  public async getAllProducts() {
    const products: Product[] = [];

    const productsElements = await this.page.locator("li.product").all();

    for (const productsElement of productsElements) {
      const name = await productsElement
        .locator("h2.woocommerce-loop-product__title")
        .textContent();
      const priceLocator = productsElement
        .locator("span.woocommerce-Price-amount.amount")
        .last();
      const priceInString = await priceLocator.textContent();

      //Convert the price from string to Number
      const parts = priceInString?.split(" ");
      const numericPart = parts ? parts[0] : "0";
      const lastPrice = parseFloat(numericPart);

      products.push({ name: name || "", price: lastPrice });
    }

    return products;
  }

  public async verifySorting(expectedProducts: Product[]) {
    await this.sortProducts();
    // Wait till last product is loaded again
    await this.page
      .locator("li.product")
      .nth(expectedProducts.length - 1)
      .waitFor({ state: "visible" });

    const products = await this.getAllProducts();
    expect(products).toEqual(expectedProducts);
  }
}
