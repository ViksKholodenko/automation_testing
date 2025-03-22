import { test, expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { BaseHelper } from "../pages/baseHelper";
import { testData } from "../data/testData";

test('Search product and verify Cart after log-in', async({page})=>{
    let searchParameter = "dress";
    const pm = new PageManager(page);
    const helper = new BaseHelper(page);
    
    //2. Navigate to HomePage
    await pm.onHomePage().openHomePage();
    
    //3. Click on Products button
    await pm.onHomePage().clickOnProduct();
    
    //4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveTitle('Automation Exercise - All Products');
   
    //5. Enter product name in search input and click search button
    //6. Verify 'SEARCHED PRODUCTS' is visible
    //7. Verify all the products related to search are visible
    const { valid: validProducts } = await pm.onProductsPage().validateSearchResults(searchParameter);
    expect(validProducts.length, `ERROR: ❌ Test failed: Search did NOT return any product with ${searchParameter} in title`).toBeGreaterThan(0);
    
    //8. Add those products to cart
    const addedItems = await pm.onProductsPage().addSeveralProductsToCart(validProducts, 3);
    
    //9. Click 'Cart' button and verify that products are visible in cart (and verify if all added products are in cart)
    await pm.onHomePage().clickOnCart();  
    const itemsInCart = await pm.onCartPage().verifyItemsInCart();
    expect(itemsInCart, 'ERROR: ❌ Test failed: The list of items in catr is different').toEqual(addedItems);
    
    //10. Click 'Signup / Login' button and submit login details
    await helper.signIn(testData.signInEmail, testData.signInTestPass)
    const userName = page.getByText(`Logged in as ${testData.singInUserName}`)
    expect(userName, "ERROR: ❌ Test failed: Unexpected user is logged in").toBeVisible()
    
    //11. Again, go to Cart page
    await pm.onHomePage().clickOnCart();
   
    //12. Verify that those products are visible in cart after login as well
    const itemsInCartAfterSignIn = await pm.onCartPage().verifyItemsInCart();
    expect(itemsInCartAfterSignIn, 'ERROR: ❌ Test failed: The list of items in catr is different after Sign-in').toEqual(addedItems);
})