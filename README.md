# home-assignment

This project demonstrates automated testing for a simple e-commerce website. It covers a core user flow scenario and includes additional bonus tasks for a more comprehensive test suite.

The main objective is to validate user interactions such as navigation, sorting, adding products to the cart, and proceeding to checkout.

## 📌Features

- Automated navigation through the e-commerce site.
- Verification of product sorting and cart operations.
- Detailed logging and assertions for test validation.
- Bonus tasks like selecting a shipping method and completing the checkout process.

## 💻Technologies Used

- Programming Language: TypeScript
- Automation Tool: Playwright

## 📝Project Structure

ecommerce-automation/

├── tests/ # Automated test scripts

│ ├── sanity.spec.ts # All test

├── pages/ # Page Object Model implementations

│ ├── AccessoriesPage.ts # Accessories page object

│ ├── CartPage.ts # Cart page object

│ ├── CheckoutPage.ts # Checkout page object

│ ├── ProductDetailsPage.ts # Product Details page object

├── helpers/ # Helpers files

│ ├── ApplicationURL.ts # Variables for URLs

│ ├── utils.ts # Utility functions

├── types/ # TypeScript types

│ ├── product.ts # Interface for Product

├── README.md # Documentation
