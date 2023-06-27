class SelectSeatPage {
  constructor() {
    this.accessibleSeatsDropdown = '.accessability__select select';
    this.allSections = '#Levels';
    this.decreaseButton = '[aria-label="Decrease amount of tickets"]';
    this.anyAvailableSeat = "//span[contains(text(), 'Any Best Available Seat')]";
    this.continueButton = "//button[contains(text(), 'Continue')]";
  }

  async clickDecreaseButton({ page, clickAmount }) {
    reporter.startStep(`Decrease tickets amount by ${clickAmount}`);
    await page.waitForSelector(this.decreaseButton);
    const decreaseButton = await page.$(this.decreaseButton);
    for (let i = 0; i < clickAmount; i += 1) {
      await decreaseButton.click();
    }
    reporter.endStep();
  }

  async selectAccessibleSeat({ page, numberOfSeats }) {
    reporter.startStep(`Select ${numberOfSeats} option in accessible seats dropdown`);
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
    const anyAvailableSeat = await page.$x(this.anyAvailableSeat);
    await anyAvailableSeat[0].click();
    const continueButton = await page.$x(this.continueButton);
    await continueButton[0].click();
    await page.waitForNavigation();
  }
}

const selectSeatPage = new SelectSeatPage();

module.exports = {
  selectSeatPage,
};
