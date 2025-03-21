import { Page } from "@playwright/test"
import { AccountStatusPage } from '../pages/accountStatusPage'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import { SignupPage } from '../pages/signupPage'
import { ProductsPage } from "./productsPage"
import { CartPage } from "./cartPage"


export class PageManager{

    //creating field for every page object
    private readonly page: Page
    private readonly accountStatusPage: AccountStatusPage
    private readonly homePage: HomePage
    private readonly loginPage: LoginPage
    private readonly signupPage: SignupPage
    private readonly productsPage: ProductsPage
    private readonly cartPage: CartPage

    constructor(page:Page){
        this.page = page

        //initialization of all our page objects with passing 'page' fixture related to the pageManager 
        this.accountStatusPage = new AccountStatusPage(this.page)
        this.homePage = new HomePage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.signupPage = new SignupPage(this.page)
        this.productsPage = new ProductsPage(this.page)
        this.cartPage = new CartPage(this.page)
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
        return this.productsPage
    }

    onCartPage(){
        return this.cartPage
    }
}