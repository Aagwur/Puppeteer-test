const timeout = 30000;
const { baseUrl } = require('../constants/urls');
const { selectSeatPage } = require('../pages/selectSeat.page');

describe('Buying ticket flow', () => {
  beforeEach(async () => {
    await page.goto(baseUrl);
  }, timeout);

  test('Check data on Cart page', async () => {
    await selectSeatPage.selectAccessibleSeat({ page, numberOfSeats: 1 });
    await selectSeatPage.selectAnyAvailableSeat({ page });
  }, timeout);
});
