import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';

/*test.beforeEach(async ({page}) =>{
    await page.goto('https://automationexercise.com/')
})*/

test('Sign-up to site', async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    await homePage.goto();
    await homePage.clickOnSingIn();

    await loginPage.isSigninPageOpen();
    await loginPage.enterSignUpCreds('test user','rozboy3@gmail.com');
    await loginPage.clickOnSingupBttn();
    
    await signupPage.signunPageIsOpened();
    await signupPage.enterAccountInformation('19','May','1988');
    await signupPage.enterRequiredAddressInfo("Test", "User", "Maint String. 123", "United States", "TX", "Austin", "12334", "5122343565");
    await signupPage.clickCreateAccount();

    //Ask how to optimize this part
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
    await page.getByTestId('continue-button').click();
    await expect(page.getByText('Logged in as test use')).toBeVisible();

})

/*test ('Log-out from site', async ({page})=>{
    
})

test('Log-in to site as correct user', async ({page}) => {
    
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickOnSingIn();

    await loginPage.isSigninPageOpen();
    await loginPage.enterSignInCreds("rozboy3@gmail.com", "testPass");
    await loginPage.clickOnSinginBttn();

    await expect(page.getByText('Logged in as test use')).toBeVisible();

    await page.getByText(' Delete Account').click();

}) */
