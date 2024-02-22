import { Page, Locator, expect } from "@playwright/test";
import {locators} from "../data/locators"

export class SignupPage {
    readonly page: Page;

    constructor(page: Page ) {
        this.page = page;
        //this.emailTxtField = page.getByTestId('email');
    }

    async signunPageIsOpened() {
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();
    }

    async enterAccountInformation(day, month, year) {
        await this.page.getByText('Mrs.').check();
        await this.page.isDisabled(locators.signUpEmailTxtField); //TODO: add verification if Email address = expected email address
        await this.page.fill(locators.signUpPasswordTxtField, 'testPass');
        await this.page.selectOption(locators.signUpDayTxtFiel, day);
        await this.page.selectOption(locators.signUpMonthTxtField, month);
        await this.page.selectOption(locators.signUpYearTxtField,year);
        await this.page.check(locators.signUpNewsletterCheckBox);
        await this.page.check(locators.signUpUniformOptinCheckBox);
    }

    async enterRequiredAddressInfo(firstName, lastName, address, country, state, city, zipcode, mobile) {
        await this.page.fill(locators.signUpFirstNameTxtField, firstName);
        await this.page.fill(locators.signUpLastNameTxtField, lastName);
        await this.page.fill(locators.signUpAddressTxtField, address);
        await this.page.selectOption(locators.singUpCountryTxtField, country); //?? how to do optimization for selectors?
        await this.page.fill(locators.singUpStateTxtField, state);
        await this.page.fill(locators.singUpStateTxtField, state);
        await this.page.fill(locators.signUpCityTxtField,city);
        await this.page.fill(locators.signUpZipCodeTxtField, zipcode);
        await this.page.fill(locators.singUpMobileNumberTxtField, mobile);
    }

    async enterNonRequiredAddressInfo (address2, company){
        await this.page.fill(locators.signUpAddress2TxtField, address2);
        await this.page.fill(locators.signUpCompanyTxtField, company);
    }

    async clickCreateAccount(){
        await this.page.click(locators.signUpCreateAccountBttn);
    }

// Ask how to describe validation messages verification for this form
}