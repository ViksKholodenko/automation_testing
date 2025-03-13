import {Page, expect} from "@playwright/test"
import {AccountStatusPage} from '../pages/accountStatusPage'
import {HomePage} from '../pages/homePage'
import {LoginPage} from '../pages/loginPage'
import {SignupPage} from '../pages/signupPage'
import { ProductsPage } from "./productsPage"


export class PageManager{

    //creating field for every page object
    private readonly page: Page
    private readonly accountStatusPage: AccountStatusPage
    private readonly homePage: HomePage
    private readonly loginPage: LoginPage
    private readonly signupPage: SignupPage
    private readonly ProductsPage: ProductsPage

    constructor(page:Page){
        this.page = page

        //initialization of all our page objects with passing 'page' fixture related to the pageManager 
        this.accountStatusPage = new AccountStatusPage(this.page)
        this.homePage = new HomePage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.signupPage = new SignupPage(this.page)
        this.ProductsPage = new ProductsPage(this.page)
    }

    //methods to return instances for all page objects
    onAccountStatusPage(){
        return this.accountStatusPage
    }

    onHomePage(){
        return this.homePage
    }

    onLoginPage(){
        return this.loginPage
    }

    onSignupPage(){
        return this.signupPage
    }

    onProductsPage(){
        return this.ProductsPage
    }
}