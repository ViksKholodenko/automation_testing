import { Page, expect } from "@playwright/test";
import { locators } from "../data/locators";
import { urls } from "../data/urls";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async openLoginPage() {
        await this.page.goto(urls.logInPageUrl);
    }

    async isLoginPageOpen() {
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    async isSignUpPageOpened() {
        await expect(this.page.getByText('New User Signup!')).toBeVisible();
    }

    async enterSignInCreds(email, password) {
        await this.page.getByTestId(locators.loginEmailTestId).fill(email);
        await this.page.getByTestId(locators.loginPasswordTestId).fill(password);
    }

    async getEmailValidationMessage() {
        var emailField = this.page.getByTestId(locators.loginEmailTestId);
        return this.getValidationMessage(emailField);
    }

    async getPassValidationMessage() {
        var passField = this.page.getByTestId(locators.loginPasswordTestId);
        return this.getValidationMessage(passField);
    }

    async getValidationMessage(field) {
        return await field.evaluate((element) => {
            const input = element as HTMLInputElement
            return input.validationMessage
        })
    }

    async clickOnSinginBttn() {
        await this.page.getByTestId(locators.loginBttnTestID).click();
    }

    async enterSignUpCreds(username, email) {
        await this.page.getByTestId(locators.signUpNameTestID).fill(username);
        await this.page.getByTestId(locators.signupEmailTestID).fill(email);
    }

    async clickOnSingupBttn() {
        await this.page.getByTestId(locators.signUpBttnTestID).click();
    }

}