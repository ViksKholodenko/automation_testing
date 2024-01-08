import {Locator, type Page } from "@playwright/test";
export class HomePage {
    readonly page: Page;
    homePageURL: string;
    singupBttn: Locator;
    logoutBttn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePageURL = 'https://automationexercise.com';
        this.singupBttn = page.getByRole('link', {name: ' Signup / Login'});
        this.logoutBttn = page.getByText('Logout');
    }

    async goto() {
        await this.page.goto(this.homePageURL);
    }

    async clickOnSingIn(){
        await this.singupBttn.click()
    }

    async clickOnLogout(){
        await this.logoutBttn.click();
    }
}