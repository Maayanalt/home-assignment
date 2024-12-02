import { Locator, Page } from "@playwright/test";

export default class ProductDetailsPage {
  readonly productDetails: Locator;

  constructor(protected page: Page) {
    this.productDetails = this.page.locator('[class="summary entry-summary"]');
  }

  public async getNameInString() {
    return (
      (await this.productDetails
        .locator('[class="product_title entry-title"]')
        .textContent()) || ""
    );
  }

  public async getPriceInString() {
    return (
      (await this.productDetails
        .locator("span.woocommerce-Price-amount.amount")
        .last()
        .textContent()) || ""
    );
  }
}
