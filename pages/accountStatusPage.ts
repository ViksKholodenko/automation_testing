import { locators } from "../data/locators";
import { Page } from "@playwright/test";

export class AccountStatusPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnContinueBttn() {
        await this.page.getByTestId(locators.accountStatusContinueBttnTestID).click();

    }
}