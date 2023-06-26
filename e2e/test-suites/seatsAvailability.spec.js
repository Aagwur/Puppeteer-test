const timeout = 30000;
const { baseUrl } = require('../constants/urls');
const { selectSeatPage } = require('../pages/selectSeat.page');

describe('Seats availability', () => {
  let page;
  beforeEach(async () => {
    page = await globalThis.__BROWSER_GLOBAL__.newPage();
    await page.goto(baseUrl);
  }, timeout);

  test.each(
    [
      ['Check sections with no seats available', 0],
      ['Check sections with separate seats available', 1],
      ['Check sections with paired seats available', 2],
    ],
  )('%s', async (title, accessibleSeatsOptionNumber) => {
    await selectSeatPage.selectAccessibleSeat({ page, numberOfSeats: accessibleSeatsOptionNumber });
    const sectionsData = await selectSeatPage.countSectionsWithSeats({ page });

    reporter.startStep(`There are ${sectionsData.activeSectionsCount} sections with available seats for 
        selected dropdown option: ${sectionsData.activeSectionsNames}`);
    reporter.endStep();
  }, timeout);
});
