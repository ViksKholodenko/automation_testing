import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { testData } from '../data/testData';

test('Log-in with incorrect email address', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.onHomePage().openHomePage();
    await pageManager.onHomePage().clickOnMenuButton(' Signup / Login'); //Would it be better to move the button name into locators file or create file for button names?

    await pageManager.onLoginPage().isLoginPageOpen();
    await pageManager.onHomePage().verifyOpenedPage('Signup / Login');

    await pageManager.onLoginPage().enterSignInCreds("", "test pass");
    await pageManager.onLoginPage().clickOnSinginBttn();

    expect(await pageManager.onLoginPage().getEmailValidationMessage()).
        toContain("Please fill in this field.");

    await pageManager.onLoginPage().enterSignInCreds("test", "test pass");
    await pageManager.onLoginPage().clickOnSinginBttn();

    expect(await pageManager.onLoginPage().getEmailValidationMessage()).
        toContain("Please include an '@' in the email address. 'test' is missing an '@'.");
})

test('Log-in with incorrect password', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.onHomePage().openHomePage();
    await pageManager.onHomePage().clickOnMenuButton(' Signup / Login');

    await pageManager.onLoginPage().isLoginPageOpen();
    //enter empty value for password text field
    await pageManager.onLoginPage().enterSignInCreds("vika@example.com", "");
    await pageManager.onLoginPage().clickOnSinginBttn();

    expect(await pageManager.onLoginPage().getPassValidationMessage()).
        toContain("Please fill in this field.");
})

test('Log-in with Incorrect Credentials', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.onHomePage().openHomePage();
    await pageManager.onHomePage().clickOnMenuButton(' Signup / Login');
    await pageManager.onLoginPage().isLoginPageOpen();
    await pageManager.onLoginPage().enterSignInCreds("test@example.com", "test");
    await pageManager.onLoginPage().clickOnSinginBttn();

    expect(page.getByText('Your email or password is incorrect!').isVisible);
})

test('Register User with existing email', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.onHomePage().openHomePage();
    await pageManager.onHomePage().verifyOpenedPage('Home');
    await pageManager.onHomePage().clickOnMenuButton(' Signup / Login');
    await pageManager.onLoginPage().isSignUpPageOpened();
    await pageManager.onLoginPage().enterSignInCreds(testData.signInEmail, testData.signInTestPass);
    await pageManager.onLoginPage().clickOnSinginBttn();
    expect(page.getByText('Email Address already exist!').isVisible);
})