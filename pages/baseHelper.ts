import { Page } from "@playwright/test"
import { PageManager } from "./pageManager" 
import { testData } from "../data/testData"

export class BaseHelper {
    readonly page: Page;
    readonly pm: PageManager;

    constructor(page: Page) {
        this.page = page;
        this.pm = new PageManager(page);
    }

    async signIn(email: string = testData.signInEmail, password: string = testData.signInTestPass) {
        await this.pm.onHomePage().clickOnSingIn()

        await this.pm.onLoginPage().isLoginPageOpen();
        await this.pm.onLoginPage().enterSignInCreds(email, password);
        await this.pm.onLoginPage().clickOnSinginBttn();        
    }
}