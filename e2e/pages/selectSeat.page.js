class SelectSeatPage {
    
    constructor() {
      this.accessibleSeatsDropdown = ".accessability__select select";
      this.allSections = "#Levels";
    }

    async selectAccessibleSeat({ page, numberOfSeats }) {
        await page.waitForSelector(this.accessibleSeatsDropdown);
        const accessibleSeatsDropdown = await page.$(this.accessibleSeatsDropdown);
        await accessibleSeatsDropdown.select(`${numberOfSeats}`);
    }

    async countSectionsWithSeats({ page }) {
        await page.waitForSelector(this.allSections);
        const sectionsData = (await page.evaluate(() => {
            const allSections = Array.from(document.querySelectorAll('#Levels g'));
            const activeSections = allSections.filter(el => el.getAttribute("class") !== 'unavailable');
            const activeSectionsNames = activeSections.map(el => el.getAttribute("id"));
            const activeSectionsCount = activeSections.length;
            return { activeSectionsCount, activeSectionsNames }
        }));
        return sectionsData;
    }
  }

  const selectSeatPage = new SelectSeatPage();
  
  module.exports = {
    selectSeatPage,
  };