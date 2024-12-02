/**
 * This app will display the current date on screen
 * Each time the updateApp function is called, the app will check to see if the date has changed, and if so send a new update to the screen
 */
class DateDisplay {
  constructor() {
    this.latestDate = new Date();
  }

  updateScreenDate() {
    // get a text string containing today's date
  }

  // each app should export this function. The function will be invoked by the api automatically at a short interval
  // It is up to each app to decide internally whether it should do anything when this is invoked, as some apps will not require any actual changes as frequenly
  appUpdateCheck() {
    console.log('APP UPDATE CHECK IN DATE DISPLAY');
    const dateCheck = new Date();
    if (dateCheck !== this.latestDate) {
      // tell the app the update the screen
      this.updateScreenDate();
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new DateDisplay();
