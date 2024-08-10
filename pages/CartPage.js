exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.noOfProducts = '//tbody[@id="tbodyid"]/tr/td[2]';
  }

  async checkProductInCart(productName) {
    try {
      const productsInCart = await this.page.$$(this.noOfProducts);
      const productFound = await productsInCart.find(async (product) => {
        const text = await product.textContent();
        console.log(text);
        return productName === text;
      });
      return !!productFound;
    } catch (error) {
      console.error('Error checking product in cart:', error);
      return false;
    }
  }
};
