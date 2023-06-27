const timeout = 30000;
const { baseUrl } = require('../constants/urls');
const { selectSeatPage } = require('../pages/selectSeat.page');

describe('Seats availability', () => {
  beforeEach(async () => {
    await page.goto(baseUrl);
  }, timeout);

  test.each(
    [
      ['Check sections with no seats available', 0],
      ['Check sections with separate seats available', 1],
      ['Check sections with paired seats available', 2],
    ],
  )('%s', async (title, ticketsNumber) => {
    await selectSeatPage.clickDecreaseButton({ page, clickAmount: 2 - ticketsNumber });
    const sectionsData = await selectSeatPage.countSectionsWithSeats({ page });

    reporter.startStep(`There are ${sectionsData.activeSectionsCount} sections with available
     ${ticketsNumber} seats: ${sectionsData.activeSectionsNames}`);
    reporter.endStep();
  }, timeout);
});
