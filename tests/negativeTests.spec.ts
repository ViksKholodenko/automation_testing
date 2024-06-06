import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../data/testData';
import { locators } from '../data/locators';

test('Log-in with incorrect email address', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.openHomePage();
    await homePage.clickOnMenuButton(' Signup / Login'); //Would it be better to move the button name into locators file or create file for button names?

    await loginPage.isLoginPageOpen();
    await homePage.verifyOpenedPage('Signup / Login');

    await loginPage.enterSignInCreds("", "test pass");
    await loginPage.clickOnSinginBttn();

    expect(await loginPage.getEmailValidationMessage()).
        toContain("Please fill out this field.");

    await loginPage.enterSignInCreds("test", "test pass");
    await loginPage.clickOnSinginBttn();

    expect(await loginPage.getEmailValidationMessage()).
        toContain("Please include an '@' in the email address. 'test' is missing an '@'.");
})

test('Log-in with incorrect password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.openHomePage();
    await homePage.clickOnMenuButton(' Signup / Login');

    await loginPage.isLoginPageOpen();
    //enter empty value for password text field
    await loginPage.enterSignInCreds("vika@example.com", "");
    await loginPage.clickOnSinginBttn();

    expect(await loginPage.getPassValidationMessage()).
        toContain("Please fill out this field.");
})

test('Log-in with Incorrect Credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.openHomePage();
    await homePage.clickOnMenuButton(' Signup / Login');
    await loginPage.isLoginPageOpen();
    await loginPage.enterSignInCreds("test@example.com", "test");
    await loginPage.clickOnSinginBttn();

    expect(page.getByText('Your email or password is incorrect!').isVisible);
})

test('Register User with existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.openHomePage();
    await homePage.verifyOpenedPage('Home');
    await homePage.clickOnMenuButton(' Signup / Login');
    await loginPage.isSignUpPageOpened();
    await loginPage.enterSignInCreds(testData.signInEmail, testData.signInTestPass);
    await loginPage.clickOnSinginBttn();
    expect(page.getByText('Email Address already exist!').isVisible);
})