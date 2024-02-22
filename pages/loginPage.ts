import { Locator, Page, expect } from "@playwright/test";
import { locators } from "../data/locators";
import { urls } from "../data/urls";

export class LoginPage {
    readonly page: Page;
   
    constructor(page: Page) {
        this.page = page;
    }
    async openLoginPage(){
        await this.page.goto(urls.logInPageUrl);
    }

    async isLoginPageOpen(){
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    async enterSignInCreds(email, password){
        await this.page.fill(locators.loginEmailTxtField, email);
        await this.page.fill(locators.loginPasswordTxtField, password);
    }

    async clickOnSinginBttn() {
        await this.page.click(locators.loginBttn);
    }

    async enterSignUpCreds(username, email){
        await this.page.fill(locators.signUpName, username);
        await this.page.fill(locators.signupEmail, email);
    }

    async clickOnSingupBttn (){
        await this.page.click(locators.signUpBttn);
    }
}