const FlipDot = require('flipdot-display');

class FlipdotDisplay {
  constructor(config = {}) {
    this.rows = config.rows;
    this.columns = config.columns;
    this.flipdot = this.initialiseFlipdot(config);

    this.addEventListeners(this.flipdot, config);
  }

  initialiseFlipdot(config) {
    // debug causes logs to fire for all flipdot related actions
    const debug = config.debug || false;
    // devMode mode allows working on a device not connected to an actual flipdot
    const devMode = config.devMode || false;

    const { port, address } = config;

    const flipdot = new FlipDot(
      port,
      address,
      this.rows,
      this.columns,
      undefined,
      {
        // debug causes logs to fire for all flipdot related actions
        debug,
        // devMode mode allows working on a device not connected to an actual flipdot
        devMode
      }
    );

    return flipdot;
  }

  addEventListeners(flipdot, config) {
    // When a successful connection to the flipdot is made
    flipdot.once('open', () => {
      console.log('Flipdot: Connection opened');

      if (config.onOpen) {
        config.onOpen();
      } else {
        // Adds a default message to the screen
        this.showText('Hello');
      }
    });

    // When the connection to the flipdot is closed
    flipdot.once('close', () => {
      console.log('Flipdot: Connection closed');
      config.onClose?.();
    });

    // Error from the creation or when communicating with the flipdot
    flipdot.once('error', (err) => {
      console.log(err);
      console.log('Flipdot: An error occured');
      config.onError?.(err);
    });
  }

  // Updates the flipdot display with a new text value
  showText(message, font = 'Banner') {
    // inverts the colour scheme, useful addition later via a toggle
    const invert = false;
    // with load set to false, it will now internally trigger an update until updateDisplay is called
    const load = false;

    this.flipdot.writeText(
      message,
      {
        font,
        width: this.columns,
        printDirection: 0
      },
      [0, 0],
      invert,
      load
    );

    this.updateDisplay();
  }

  // Converts a matrix to bytes then writes it to the display
  showMatrix(matrix) {
    this.flipdot.writeMatrix(matrix, false);
    this.updateDisplay();
  }

  // Pushes the update to the flipdot
  updateDisplay() {
    this.flipdot.send();
  }

  // Returns the matrix from the specified text, does not update the display
  // Useful for making any manupulations to the matrix before sending it to the display
  getMatrixFromText(text, fontOptions) {
    return flipdot.getMatrixFromText(text, fontOptions);
  }
}

module.exports = FlipdotDisplay;
