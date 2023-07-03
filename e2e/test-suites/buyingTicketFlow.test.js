const timeout = 30000;
const { baseUrl } = require('../constants/urls');
const { selectSeatPage } = require('../pages/selectSeat.page');
const { confirmSeatPage } = require('../pages/confirmSeat.page');
const { cartPage } = require('../pages/cart.page');

describe('Buying ticket flow', () => {
  beforeAll(async () => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  }, timeout);

  test('Check data on Cart page', async () => {
    await selectSeatPage.clickDecreaseButton({ page, clickAmount: 1 });
    await selectSeatPage.selectAnyAvailableSeat({ page });
    const orderDataConfirmSeats = await confirmSeatPage.getOrderData({ page });
    await confirmSeatPage.confirmSeats({ page });
    const orderDataPayment = await cartPage.getOrderData({ page });

    reporter.startStep(`Verify that price: ${orderDataConfirmSeats.totalPriceText} and date: 
    ${orderDataConfirmSeats.dateText} on Payment page is the same as on Confirm Seats page`);
    expect(orderDataConfirmSeats.totalPriceText).toEqual(orderDataPayment.totalPriceText);
    expect(orderDataConfirmSeats.dateText).toEqual(orderDataPayment.dateTextFormatted);
    expect(orderDataConfirmSeats.quantity).toEqual(orderDataPayment.quantityText);
    reporter.endStep();
  }, timeout);
});
