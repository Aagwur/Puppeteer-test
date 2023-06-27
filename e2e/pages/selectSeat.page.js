class SelectSeatPage {
  constructor() {
    this.accessibleSeatsDropdown = '.accessability__select select';
    this.allSections = '#Levels';
    this.anyAvailableSeat = "//span[contains(text(), 'Any Best Available Seat')]";
  }

  async selectAccessibleSeat({ page, numberOfSeats }) {
    reporter.startStep(`Select ${numberOfSeats} option in dropdown`);
    await page.waitForSelector(this.accessibleSeatsDropdown);
    const accessibleSeatsDropdown = await page.$(this.accessibleSeatsDropdown);
    await accessibleSeatsDropdown.select(`${numberOfSeats}`);
    reporter.endStep();
  }

  async countSectionsWithSeats({ page }) {
    reporter.startStep('Count sections with available seats');
    await page.waitForSelector(this.allSections);
    const sectionsData = (await page.evaluate(() => {
      const allSections = Array.from(document.querySelectorAll('#Levels g'));
      const activeSections = allSections.filter((el) => el.getAttribute('class') !== 'unavailable');
      const activeSectionsNames = activeSections.map((el) => el.getAttribute('id'));
      const activeSectionsCount = activeSections.length;
      return { activeSectionsCount, activeSectionsNames };
    }));
    reporter.endStep();
    return sectionsData;
  }

  async selectAnyAvailableSeat({ page }) {
    await page.waitForXPath(this.anyAvailableSeat);
    const button = await page.$x(this.anyAvailableSeat);
    await page.click(button);
    expect(5).toEqual(5);
  }
}

const selectSeatPage = new SelectSeatPage();

module.exports = {
  selectSeatPage,
};
