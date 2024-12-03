import { Locator, Page } from "@playwright/test";

export default class CheckoutPage {
  private firstNameField: Locator;
  private lastNameField: Locator;
  private countryField: Locator;
  private streetAddressField: Locator;
  private postcodeField: Locator;
  private cityField: Locator;
  private phoneField: Locator;
  private emailField: Locator;
  private placeOrderButton: Locator;

  constructor(protected page: Page) {
    this.firstNameField = this.page.locator("#billing_first_name");
    this.lastNameField = this.page.locator("#billing_last_name");
    this.countryField = this.page.locator("#billing_country");
    this.streetAddressField = this.page.locator("#billing_address_1");
    this.postcodeField = this.page.locator("#billing_postcode");
    this.cityField = this.page.locator("#billing_city");
    this.phoneField = this.page.locator("#billing_phone");
    this.emailField = this.page.locator("#billing_email");
    this.placeOrderButton = this.page.locator("#place_order");
  }

  public async fillMandatoryFields(
    firstName: string,
    lastName: string,
    country: string,
    streetAddress: string,
    postcode: string,
    city: string,
    phone: string,
    email: string
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.countryField.selectOption(country);
    await this.streetAddressField.fill(streetAddress);
    await this.postcodeField.fill(postcode);
    await this.cityField.fill(city);
    await this.phoneField.fill(phone);
    await this.emailField.fill(email);
  }

  public async placeOrder() {
    await this.placeOrderButton.click();
  }
}
