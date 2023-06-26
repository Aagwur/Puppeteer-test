const timeout = 30000;
const { baseUrl } = require("../constants/urls");

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
      await page.waitForSelector('.accessability__select select');
      const accessibleSeatsDropdown = await page.$(".accessability__select select");
      await accessibleSeatsDropdown.select(`${accessibleSeatsOptionNumber}`); 
      reporter.endStep();
      reporter.startStep(`Count sections with available seats`);
      await page.waitForSelector('#Levels');
      const sectionsData = (await page.evaluate(() => {
        const allSections = Array.from(document.querySelectorAll('#Levels g'));
        const activeSections = allSections.filter(el => el.getAttribute("class") !== 'unavailable');
        const activeSectionsNames = activeSections.map(el => el.getAttribute("id"));
        const activeSectionsCount = activeSections.length;
        return { activeSectionsCount, activeSectionsNames }
      }));
      reporter.endStep();
      reporter.startStep(`There are ${sectionsData.activeSectionsCount} sections with available seats for 
        selected dropdown option: ${sectionsData.activeSectionsNames}`);
      reporter.endStep();
    }, timeout);
  }
);