class ConfirmSeatPage {
  constructor() {
    this.totalPrice = '.syos-basket__total .syos-basket__total-value';
    this.date = '.syos-performance-details__date';
    this.confirmSeatsButton = "//button[contains(text(), 'Confirm seats')]";
  }

  async getOrderData({ page }) {
    await page.waitForSelector(this.totalPrice);
    const totalPrice = await page.$(this.totalPrice);
    const date = await page.$(this.date);
    const totalPriceText = await page.evaluate((el) => el.textContent, totalPrice);
    const dateText = await page.evaluate((el) => el.textContent, date);
    return { totalPriceText, dateText };
  }

  async confirmSeats({ page }) {
    reporter.startStep('Click confirm seats button');
    await page.waitForXPath(this.confirmSeatsButton);
    const confirmSeatsButton = await page.$x(this.confirmSeatsButton);
    await confirmSeatsButton[0].click();
    await page.waitForNetworkIdle();
    reporter.endStep();
  }
}

const confirmSeatPage = new ConfirmSeatPage();

module.exports = {
  confirmSeatPage,
};
