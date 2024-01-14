import { Page, Locator, expect } from "@playwright/test";
import { locators } from "../data/locators"
import { testData } from "../data/testData";

export class SignupPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        //this.emailTxtField = page.getByTestId('email');
    }

    async signunPageIsOpened() {
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();
    }

    async enterAccountInformation(day, month, year) {
        await this.page.getByText('Mrs.').check();
        expect(await this.page.getByTestId(locators.signUpEmailTxtTestId).textContent(), testData.signUpTestUserEmail);
        await this.page.getByTestId(locators.signUpPasswordTxtTestId).fill(testData.signUpPassword);
        await this.page.getByTestId(locators.signUpDayTxtTestId).selectOption(day);
        await this.page.getByTestId(locators.signUpMonthTxtTestId).selectOption(month);
        await this.page.getByTestId(locators.signUpYearTxtTestId).selectOption(year);
        this.page.locator(locators.signUpNewsletterCheckBox).check;
        this.page.locator(locators.signUpUniformOptinCheckBox).check;
    }

    async enterRequiredAddressInfo(firstName, lastName, address, country, state, city, zipcode, mobile) {
        await this.page.getByTestId(locators.signUpFirstNameTxtTestId).fill(firstName);
        await this.page.getByTestId(locators.signUpLastNameTxtTestId).fill(lastName);
        await this.page.getByTestId(locators.signUpAddressTxtTestId).fill(address);
        await this.page.getByTestId(locators.singUpCountryTxtTestId).selectOption(country);
        await this.page.getByTestId(locators.singUpStateTxtTestId).fill(state);
        await this.page.getByTestId(locators.singUpStateTxtTestId).fill(state);
        await this.page.getByTestId(locators.signUpCityTxtTestId).fill(city);
        await this.page.getByTestId(locators.signUpZipCodeTxtTestId).fill(zipcode);
        await this.page.getByTestId(locators.singUpMobileNumberTxtTestId).fill(mobile);
    }

    async enterNonRequiredAddressInfo(address2, company) {
        await this.page.getByTestId(locators.signUpAddress2TxtTestID).fill(address2);
        await this.page.getByTestId(locators.signUpCompanyTxtTestId).fill(company);
    }

    async clickCreateAccount() {
        await this.page.getByTestId(locators.signUpCreateAccountBttnTestId).click();
    }

    // Ask how to describe validation messages verification for this form
}