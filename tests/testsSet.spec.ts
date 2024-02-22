import {test, expect, chromium, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';


test('Sign-up to site and deleting account', async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    await homePage.openHomePage();
    await homePage.clickOnSingIn();

    await loginPage.isLoginPageOpen();
    await loginPage.enterSignUpCreds('test user','rozboy3@gmail.com');
    await loginPage.clickOnSingupBttn();
    
    await signupPage.signunPageIsOpened();
    await signupPage.enterAccountInformation('19','May','1988');
    await signupPage.enterRequiredAddressInfo("Test", "User", "Maint String. 123", "United States", "TX", "Austin", "12334", "5122343565");
    await signupPage.clickCreateAccount();

    //Ask how to optimize this part
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();  //??? is it ok to verify by text, or page URL would be better?
    await page.getByTestId('continue-button').click();
    await expect(page.getByText('Logged in as test use')).toBeVisible();
    await homePage.clickOnDeleteAccount();
    await expect(page.getByText('Account deleted!')).toBeVisible();
})

test('Log-in & Log-out as existing user', async ({page}) => {
    
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    //await page.waitForLoadState();

    await homePage.openHomePage();
    await homePage.clickOnSingIn();

    await loginPage.isLoginPageOpen();
    await loginPage.enterSignInCreds("testuserviktoriia@gmail.com", "xwj2pxz_pqk2ywt2AHE");
    await loginPage.clickOnSinginBttn();

    await expect(page.getByText('Logged in as Vika\'s Test User')).toBeVisible();
    await homePage.clickOnLogout();
    await loginPage.isLoginPageOpen;

})
