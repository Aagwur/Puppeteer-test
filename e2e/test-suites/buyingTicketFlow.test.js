const timeout = 30000;
const { baseUrl } = require('../constants/urls');
const { selectSeatPage } = require('../pages/selectSeat.page');
const { confirmSeatPage } = require('../pages/confirmSeat.page');
const { paymentPage } = require('../pages/payment.page');

describe('Buying ticket flow', () => {
  beforeEach(async () => {
    await page.goto(baseUrl);
  }, timeout);

  test('Check data on Cart page', async () => {
    await selectSeatPage.clickDecreaseButton({ page, clickAmount: 1 });
    await selectSeatPage.selectAnyAvailableSeat({ page });
    const orderDataConfirmSeats = await confirmSeatPage.getOrderData();
    await confirmSeatPage.confirmSeats({ page });
    const orderDataPayment = await paymentPage.getOrderData();
    expect(orderDataConfirmSeats.totalPriceText).toEqual(orderDataPayment.totalPriceText);
    expect(orderDataConfirmSeats.dateText).toEqual(orderDataPayment.dateText);
  }, timeout);
});