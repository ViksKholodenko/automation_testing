import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { testData } from '../data/testData';
import { locators } from '../data/locators';

test('Sign-up to site and deleting account', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    await homePage.openHomePage();
    await homePage.clickOnSingIn();

    await loginPage.isLoginPageOpen();
    await loginPage.enterSignUpCreds('test user', 'rozboy3@gmail.com');
    await loginPage.clickOnSingupBttn();

    await signupPage.signunPageIsOpened();
    await signupPage.enterAccountInformation(testData.signUpDay, testData.signUpMonth, testData.signUpYear);
    await signupPage.enterRequiredAddressInfo(testData.signUpFirstName, testData.signUpLastName, testData.singUpAddress, testData.signUpCountry, testData.signUpState, testData.signUpCity, testData.signUpZipCode, testData.signUpPhone);
    await signupPage.clickCreateAccount();

    //Ask how to optimize this part
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();  //??? is it ok to verify by text, or page URL would be better?
    await page.getByTestId(locators.accountStatusContinueBttnTestID).click();
    await expect(page.getByText('Logged in as test use')).toBeVisible();
    await homePage.clickOnDeleteAccount();
    await expect(page.getByText('Account deleted!')).toBeVisible();
})

test('Log-in & Log-out as existing user', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    //await page.waitForLoadState();

    await homePage.openHomePage();
    await homePage.clickOnMenuButton(' Signup / Login');

    await loginPage.isLoginPageOpen();
    await loginPage.enterSignInCreds(testData.signInEmail, testData.signInTestPass);
    await loginPage.clickOnSinginBttn();

    await expect(page.getByText('Logged in as Vika\'s Test User')).toBeVisible();
    await homePage.clickOnMenuButton("Logout");
    loginPage.isLoginPageOpen;
})