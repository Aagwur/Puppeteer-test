const timeout = 30000;
const { baseUrl } = require("../constants/urls.js");
const { selectSeatPage } = require("../pages/selectSeat.page.js");

describe('Check seats availability', () => {
    let page;
    beforeEach(async () => {
      page = await globalThis.__BROWSER_GLOBAL__.newPage();
      await page.goto(baseUrl);
    }, timeout);

    test.each(
      [
        [ "Check sections with no seats available", 0 ],
        [ "Check sections with separate seats available", 1 ],
        [ "Check sections with paired seats available", 2 ],
      ]
    )('%s', async (title, accessibleSeatsOptionNumber) => {
      reporter.startStep(`Select ${accessibleSeatsOptionNumber} option in dropdown`);
      await selectSeatPage.selectAccessibleSeat({ page, numberOfSeats: accessibleSeatsOptionNumber });
      reporter.endStep();
      reporter.startStep(`Count sections with available seats`);
      const sectionsData = await selectSeatPage.countSectionsWithSeats({ page });
      reporter.endStep();
      reporter.startStep(`There are ${sectionsData.activeSectionsCount} sections with available seats for 
        selected dropdown option: ${sectionsData.activeSectionsNames}`);
      reporter.endStep();
    }, timeout);
  }
);