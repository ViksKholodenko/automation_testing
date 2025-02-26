import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { testData } from '../data/testData';
import { locators } from '../data/locators';

test('Sign-up to site and deleting account', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onHomePage().openHomePage();
    await pm.onHomePage().clickOnSingIn();

    await pm.onLoginPage().isLoginPageOpen();
    await pm.onLoginPage().enterSignUpCreds('test user', 'rozboy3@gmail.com');
    await pm.onLoginPage().clickOnSingupBttn();

    await pm.onSignupPage().signunPageIsOpened();
    await pm.onSignupPage().enterAccountInformation(testData.signUpDay, testData.signUpMonth, testData.signUpYear);
    await pm.onSignupPage().enterRequiredAddressInfo(testData.signUpFirstName, testData.signUpLastName, testData.singUpAddress, testData.signUpCountry, testData.signUpState, testData.signUpCity, testData.signUpZipCode, testData.signUpPhone);
    await pm.onSignupPage().clickCreateAccount();

    //Ask how to optimize this part
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();  //??? is it ok to verify by text, or page URL would be better?
    await page.getByTestId(locators.accountStatusContinueBttnTestID).click();
    await expect(page.getByText('Logged in as test use')).toBeVisible();
    await pm.onHomePage().clickOnDeleteAccount();
    await expect(page.getByText('Account deleted!')).toBeVisible();
})

test('Log-in & Log-out as existing user', async ({ page }) => {

    const pm = new PageManager(page)

    //await page.waitForLoadState();

    await pm.onHomePage().openHomePage();
    await pm.onHomePage().clickOnMenuButton(' Signup / Login');

    await pm.onLoginPage().isLoginPageOpen();
    await pm.onLoginPage().enterSignInCreds(testData.signInEmail, testData.signInTestPass);
    await page.screenshot({path: 'screenshots/completedLoginForm.png'})
    await pm.onLoginPage().clickOnSinginBttn();

    await expect(page.getByText('Logged in as Vika\'s Test User')).toBeVisible();
    await pm.onHomePage().clickOnMenuButton("Logout");
    pm.onLoginPage().isLoginPageOpen;
})