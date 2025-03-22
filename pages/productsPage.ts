import {Page} from "@playwright/test"

export class ProductsPage {
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }

    async searchProductByText(searchParameter: string){
        try{
            await this.page.getByRole('textbox', {name: "search"}).fill(searchParameter);
            await this.page.locator('#submit_search').click();
            console.info(`Searched for '${searchParameter}'`);
        } catch(error: any){
            console.error(`ERROR: ❌ Failed to search for '${searchParameter}'`);
        }
        return this;
    }

    async returnSearchProductByTextResult(searchParameter: string): Promise<string[]>{
        await this.searchProductByText(searchParameter);
        return await this.page.locator('.productinfo.text-center p').allTextContents();
    }

    async validateSearchResults(searchParameter: string){
        const searchResult = await this.returnSearchProductByTextResult(searchParameter);
        const validProducts = searchResult.filter(title => title.toLowerCase().includes(searchParameter));
        const invalidProducts = searchResult.filter(title => !title.toLowerCase().includes(searchParameter));
        console.info(`Info: Total search results: ${searchResult.length}`);
        console.info(`Info: Valid products: ${validProducts.length}`);
        console.info(`Info: Invalid products (do not contain ${searchParameter} in title): ${invalidProducts.length}`);
        //If no valid results - test failed
        if(validProducts.length == 0){
            console.error(`ERROR: ❌ Test failed: Search did NOT return any product with ${searchParameter} in title`);
        }

        //If there is any correct results - test continue run and inform about issue with Filter
        if(invalidProducts.length > 0){
            console.warn(`WARNING: Search is not working correctly! Some results do not contain ${searchParameter} in title`);
            console.warn(`WARNING: Unexpected product found: \n ${invalidProducts.join('\n')}`);
        }
        return{valid: validProducts, invalid: invalidProducts};
    }

    async addSingleProductToCart(productName: string) {
        try {
            const matchingProduct = this.page.locator(`.single-products:has-text("${productName}")`);
            await matchingProduct.waitFor({state: 'visible', timeout:5000})
            await matchingProduct.hover();
            const addToCartButton = matchingProduct.locator('.product-overlay .btn.btn-default.add-to-cart');
            await addToCartButton.waitFor({state: 'visible', timeout:5000})
            await addToCartButton.click();
            console.info(`Info: Product added to Cart: ${productName}`)
        } catch(error: any){
            console.error(`ERROR: ❌ Fail to Add product: ${productName}`)
        }
    }

    /**
     * This method uses addSingleProductToCart and closePopup to add multiple products to cart 
     * @param validProducts 
     * @returns the list of addedItems
     */
    async addSeveralProductsToCart(validProducts: string[], productsToAdd: number){
        let addedItems: string[] = [];

        if(validProducts.length < productsToAdd){
            console.info(`Info: Only ${validProducts.length} valid products found. Adjusting productsToAdd from ${productsToAdd} to ${validProducts.length}`);
            productsToAdd = validProducts.length;
        }
        for (let productNum = 0; productNum < productsToAdd; productNum++) {
            const productName = validProducts[productNum];
            await this.addSingleProductToCart(productName);
            addedItems.push(productName.trim());
            await this.closePopupToContinueShopping();
        }
        console.info(`Info: Final list of Added items: ${addedItems}`);
        return addedItems;
    }

    async closePopupToContinueShopping() {
        try{
            const continueShoppingBttn = this.page.locator('.modal-footer .btn.btn-success.close-modal.btn-block');
            await continueShoppingBttn.waitFor({state: 'visible', timeout:5000})
            await continueShoppingBttn.click();
        } catch(error: any){
            console.error(`ERROR: Error while closing popup`);
        }
    }

    async closePopupToViewCart() {
        try{
            const viewCartBttn = this.page.locator('.modal-body .text-center a u');
            await viewCartBttn.waitFor({ state: 'visible', timeout: 5000 })
            await viewCartBttn.click();
            console.info(`Info: Clicked "View Cart" button`);
        } catch (error: any) {
            console.error(`ERROR: Error while clicking "View Cart":`);
        }
    }
}