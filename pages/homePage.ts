import { Locator, type Page } from "@playwright/test";
import { urls } from "../data/urls";
import { locators } from "../data/locators";
export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openHomePage() {
        await this.page.goto(urls.homePageUrl);
    }

    async clickOnHome() {
        await this.page.getByText(locators.homeBttnText).click();
    }

    async clickOnProduct() {
        await this.page.getByText(locators.productsBttnText).click();
    }

    async clickOnCart() {
        await this.page.getByText(locators.cartBttnText).click();
    }

    async clickOnSingIn() {
        await this.page.getByRole('link', { name: ' Signup / Login' }).click()
    }

    async clickOnTestCases() {
        await this.page.getByText(locators.testCasesBttnText).click();
    }

    async clickOnAPITesting() {
        await this.page.getByText(locators.apiTestingBttnText).click();
    }

    async clickOnVideoTutorials() {
        await this.page.getByText(locators.videoTutorialsBttnText).click();
    }

    async clickOnContactUs() {
        await this.page.getByText(locators.contactUsBttnText).click();
    }

    // function to click on Home, Product, Cart, Test Cases, API Testing, Video Tutorials, Log Out
    // not sure if it's a good practice to use this method instead of separate method for each button.
    async clickOnMenuButton(buttonName) {
        await this.page.getByText(buttonName).click();
    }


    // Log out and Delete account appears when user logged in
    async clickOnLogout() {
        await this.page.getByText(locators.logoutBttnText).click();
    }

    async clickOnDeleteAccount() {
        await this.page.getByText(' Delete Account').click();
    }
}