import {Locator, type Page } from "@playwright/test";
export class HomePage {
    readonly page: Page;
    homePageURL: string;
    singupBttn: Locator;
    logoutBttn: Locator;
    homeBttn: Locator;
    productsBttn: Locator;
    cartBttn: Locator;
    testCasesBttn: Locator;
    apiTestingBttn: Locator;
    videoTutorialsBttn: Locator;
    contactUsBttn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePageURL = 'https://automationexercise.com';
        this.singupBttn = page.getByRole('link', {name: ' Signup / Login'});
        this.logoutBttn = page.getByText('Logout');
        this.homeBttn = page.getByText('Home');
        this.productsBttn = page.getByText('Products');
        this.cartBttn = page.getByText('Cart');
        this.testCasesBttn = page.getByText('Test Cases');
        this.apiTestingBttn = page.getByText('API Testing');
        this.videoTutorialsBttn = page.getByText('Video Tutorials');
        this.contactUsBttn = page.getByText('Contact us');
    }

    async openHomePage() {
        await this.page.goto(this.homePageURL);
    }

    // ?? Maybe this part with Header menu could be moved to separate class. Let's discuss this on meeting
    async clickOnHome(){
        await this.homeBttn.click();
    }

    async clickOnProduct(){
        await this.productsBttn.click();
    }

    async clickOnCart(){
        await this.cartBttn.click();
    }

    async clickOnSingIn(){
        await this.singupBttn.click()
    }

    async clickOnTestCases(){
        await this.testCasesBttn.click();
    }

    async clickOnAPITesting() {
        await this.apiTestingBttn.click();
    }

    async clickOnVideoTutorials(){
        await this.videoTutorialsBttn.click();
    }

    async clickOnContactUs(){
        await this.contactUsBttn.check();
    }

    // ?? is it ok to use such approach instead of previous list of methods to click on each button?
    async clickOnMenuButton(buttonName){
        await this.page.getByText(buttonName).click();
    }


    // Log out and Delete account appears when user logged in
    async clickOnLogout(){
        await this.logoutBttn.click();
    }

    async clickOnDeleteAccount(){
        await this.page.getByText(' Delete Account').click();
    }
}