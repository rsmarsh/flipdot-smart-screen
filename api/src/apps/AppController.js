const dateDisplay = require('./dateDisplay.js');

const defaultApp = 'dateDisplay';
const appList = {
  dateDisplay
};

/**
 * This class takes care of triggering the currently active app at intervals
 * If you throw a new active app name at it, then it'll cancel the old app timer and start a new one on a different app
 */
class AppController {
  constructor(config) {
    // how often an app will be asked to check if it needs to update
    this.pollFrequency = config.pollFrequency || 5000;

    // this will be used for the timer intervals, and helps with clearing the interval on app change
    this.appIntervalTimer;

    this.activeApp = config.activeApp
      ? appList[config.activeApp]
      : appList[defaultApp];

    // kicks off the timer to check for an active app
    this.startAppUpdateTimer();
  }

  askAppToUpdate() {
    if (!this.activeApp) {
      console.error('No active app found, unable to ask for update');
      return;
    }

    if (!this.activeApp.appUpdateCheck) {
      console.error('Active app is missing an appUpdateCheck function');
      return;
    }

    this.activeApp.appUpdateCheck();
  }

  setActiveApp(newApp) {
    this.clearAppUpdateTimer();
    this.activeApp = appList[newApp];
    this.startAppUpdateTimer();
  }

  clearAppUpdateTimer() {
    clearInterval(this.appIntervalTimer);
  }

  startAppUpdateTimer() {
    this.appIntervalTimer = setInterval(() => {
      this.askAppToUpdate();
    }, this.pollFrequency);
  }
}

module.exports = AppController;
