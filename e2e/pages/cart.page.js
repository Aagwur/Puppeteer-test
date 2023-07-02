const moment = require('moment');

class CartPage {
  constructor() {
    this.totalPrice = '[class="price basket__lineItem__desktop"]';
    this.date = '[class="performance-date-info"]';
  }

  async getOrderData({ page }) {
    await page.waitForSelector(this.totalPrice);
    const totalPrice = await page.$(this.totalPrice);
    const date = await page.$(this.date);
    const totalPriceText = await page.evaluate((el) => el.textContent, totalPrice);
    const dateText = (await page.evaluate((el) => el.textContent, date)).replace(/\s+/g, ' ').trim();
    const dateTextFormatted = moment(dateText, 'ddd, MMM D, yyyy h:mma').format('MMMM D, yyyy h:mma');
    return { totalPriceText, dateTextFormatted };
  }
}

const cartPage = new CartPage();

module.exports = {
  cartPage,
};
