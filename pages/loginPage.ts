import { Locator, Page, expect } from "@playwright/test";
import { data } from "../data/data";

export class LoginPage {
    readonly page: Page;
    loginPageURL: string;
    signupName: Locator;
    signupEmail: Locator;
    signupBttn: Locator;
    loginBttn: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.loginPageURL = 'https://automationexercise.com/login';
        this.signupName = page.getByTestId('signup-name');
        this.signupEmail = page.getByTestId('signup-email');
        this.signupBttn = page.getByTestId('signup-button');
        this.loginBttn = page.getByTestId('login-button');
    }
    async goto(){
        await this.page.goto(this.loginPageURL);
    }

    async isSigninPageOpen(){
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    async enterSignInCreds(email, password){
        await this.page.fill(data.loginEmailTxtField, email);
        await this.page.fill(data.loginPasswordTxtField, password);
    }

    async enterSignUpCreds(username, email){
        await this.signupName.fill(username);
        await this.signupEmail.fill(email);
    }

    async clickOnSingupBttn (){
        await this.signupBttn.click();
    }

    async clickOnSinginBttn() {
        await this.loginBttn.click();
    }

}