import { Page, Locator, expect } from "@playwright/test";
import {data} from "../data/data"

export class SignupPage {
    readonly page: Page;
    emailTxtField: Locator;
    passwordTxtField: Locator;

    constructor(page: Page ) {
        this.page = page;
        //this.emailTxtField = page.getByTestId('email');
        this.passwordTxtField = page.getByTestId('password');

    }

    async signunPageIsOpened() {
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();
    }

    async enterAccountInformation(day, month, year) {
        await this.page.getByText('Mrs.').check();
        await this.page.isDisabled(data.signUpEmailTxtField); //TODO: add verification if Email address = expected email address
        await this.page.fill(data.signUpPasswordTxtField, 'testPass');
        await this.page.selectOption(data.signUpDayTxtFiel, day);
        await this.page.selectOption(data.signUpMonthTxtField, month);
        await this.page.selectOption(data.signUpYearTxtField,year);
        await this.page.check(data.signUpNewsletterCheckBox);
        await this.page.check(data.signUpUniformOptinCheckBox);
    }

    async enterRequiredAddressInfo(firstName, lastName, address, country, state, city, zipcode, mobile) {
        await this.page.fill(data.signUpFirstNameTxtField, firstName);
        await this.page.fill(data.signUpLastNameTxtField, lastName);
        await this.page.fill(data.signUpAddressTxtField, address);
        await this.page.selectOption(data.singUpCountryTxtField, country); //?? how to do optimization for selectors?
        await this.page.fill(data.singUpStateTxtField, state);
        await this.page.fill(data.singUpStateTxtField, state);
        await this.page.fill(data.signUpCityTxtField,city);
        await this.page.fill(data.signUpZipCodeTxtField, zipcode);
        await this.page.fill(data.singUpMobileNumberTxtField, mobile);
    }

    async enterNonRequiredAddressInfo (address2, company){
        await this.page.fill(data.signUpAddress2TxtField, address2);
        await this.page.fill(data.signUpCompanyTxtField, company);
    }

    async clickCreateAccount(){
        await this.page.click(data.signUpCreateAccountBttn);
    }

// Ask how to describe validation messages verification for this form
}