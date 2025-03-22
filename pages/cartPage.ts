import { Page, expect } from '@playwright/test'
import { testData } from '../data/testData';

export class CartPage {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async verifyItemsInCart(){
        const itemsInCart = await this.page.locator('.cart_description h4 a').allTextContents();
        console.log(itemsInCart); 
        return itemsInCart;
    }
}