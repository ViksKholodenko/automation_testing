import { test, expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";

test('Search product and verify Cart after log-in', async({page}) =>{
    let searchParameter = "dress";
    const pm= new PageManager(page)
    await pm.onHomePage().openHomePage();
    await pm.onHomePage().clickOnProduct();
    await expect(page).toHaveTitle('Automation Exercise - All Products');
    //await pm.onProductsPage().searchProductByText(searchParameter);
    const { valid: validProducts } = await pm.onProductsPage().validateSearchResults(searchParameter);
    const addedItems = await pm.onProductsPage().addSeveralProductsToCart(validProducts, 3);
    await pm.onHomePage().clickOnCart();
    const itemsInCart = await page.locator('.cart_description h4 a').allTextContents();
    console.log(itemsInCart);  
    expect(itemsInCart).toEqual(addedItems);
})
