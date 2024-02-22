import {Locator, type Page } from "@playwright/test";
import { urls } from "../data/urls";
import { locators } from "../data/locators";
export class HomePage {
    readonly page: Page;
    singupBttn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.singupBttn = page.getByRole('link', {name: ' Signup / Login'}); //test fails and I cannot use the same approach as for other buttons with getByText locator
    }

    async openHomePage() {
        await this.page.goto(urls.homePageUrl);
    }

    async clickOnHome(){
        await this.page.click(locators.homeBttn);
    }

    async clickOnProduct(){
        await this.page.click(locators.productsBttn);
    }

    async clickOnCart(){
        await this.page.click(locators.cartBttn);
    }

    async clickOnSingIn(){
        await this.singupBttn.click()
    }

    async clickOnTestCases(){
        await this.page.click(locators.testCasesBttn);
    }

    async clickOnAPITesting() {
        await this.page.click(locators.apiTestingBttn);
    }

    async clickOnVideoTutorials(){
        await this.page.click(locators.videoTutorialsBttn);
    }

    async clickOnContactUs(){
        await this.page.check(locators.contactUsBttn);
    }

    // ?? is it ok to use such approach instead of previous list of methods to click on each button?
    async clickOnMenuButton(buttonName){
        await this.page.getByText(buttonName).click();
    }


    // Log out and Delete account appears when user logged in
    async clickOnLogout(){
        await this.page.click(locators.logoutBttn);
    }

    async clickOnDeleteAccount(){
        await this.page.getByText(' Delete Account').click();
    }
}