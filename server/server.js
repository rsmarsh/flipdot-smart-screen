const express = require('express');
const app = express();
const cors = require('cors');
const serverPort = 3001;
const path = require('path');
const fs = require('fs');
const SIZE = require('./src/size.js');
require('dotenv').config();

const { insertMessage, queryMessageHistory } = require('./db.js');
const {
  getEmptyMatrix,
  getOffsetPositions,
  combineTwoMatrix,
  getPartiallyCleanedMatrix,
  convertAsciiToBooleanMatrix,
  getQuarterSectionedMatrix,
  getHalfSectionedMatrix
} = require('./src/utils.js');

const PORT = '/dev/ttyUSB0';
// const PORT = 'COM3'; // Windows USB port
const ADDRESS = 1;
const ROWS = SIZE.HEIGHT;
const COLUMNS = SIZE.WIDTH;

const FlipDot = require('flipdot-display');

let flipdot;
let visitorCount = 0;
let currentMatrix = getEmptyMatrix();

const logMatrix = (matrix) => {
  let textMatrix = [];
  matrix.forEach((row) => {
    const stringRow = row.map((dot) => (dot ? 'X' : ' ')).join('');
    textMatrix.push(stringRow);
  });

  console.log(textMatrix);
};

// when working on a device not connected to an actual flipdot, prevent it attempting to connect and erroirng

flipdot = new FlipDot(PORT, ADDRESS, ROWS, COLUMNS, undefined, {
  debug: true,
  devMode: process.env.NODE_ENV === 'development'
});

app.get('/', (req, res) => {
  const options = {
    root: path.join(__dirname)
  };

  res.sendFile(`${options.root}/src/index.html`);
  console.log(`Visitor ${visitorCount} appeared`);
  visitorCount += 1;
});

app.use(express.json());

var allowedOrigins = [
  'http://localhost:3000',
  'https://isitnice.co.uk',
  'https://richardmarshall.dev'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) === -1 && origin !== undefined) {
        var msg = 'Not in CORS allow list';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.post('/text/', (req, res) => {
  const { message, password, font, section } = req.body;
  const apiPassword = process.env.TEXT_API_PASSWORD;

  // return an error if the incorrect password is sent
  if (password !== apiPassword) {
    res.status(401).json({ err: 'Incorrect Password' });
    return;
  }

  const fontOptions = {
    font: font,
    width: COLUMNS,
    printDirection: 0
  };

  const offset = [0, 0];
  const invert = false;

  // specify a section if adding to only a partial part of the display
  if (section) {
    // find out at which section to apply the partial matrix onto the full matrix
    const offsets = getOffsetPositions(section);

    // limit the width to the total size of the selected section
    fontOptions.width = offsets.endCol - offsets.startCol;
    const load = false;

    // with load set to false, it will return the matrix but not send it onto the screen
    const partialMatrixData = flipdot.getMatrixFromText(
      message,
      fontOptions,
      [0, 0], //default offset for now, we handle it separately below
      invert,
      load
    );

    const partialMatrixBooleanArray =
      convertAsciiToBooleanMatrix(partialMatrixData);

    // the current matrix with the targeted section wiped
    const preparedMatrix = getPartiallyCleanedMatrix(section, currentMatrix);

    ////////////// FEATURE DISABLED FOR NOW - section lines didn't look good /////////////////
    // const quarterSections = [
    //   'topleft',
    //   'topright',
    //   'bottomleft',
    //   'bottomright'
    // ];
    // const halfSections = ['top', 'bottom'];
    //
    // draws the lines between the sections on the matrix depending on the section chosen by the user,
    // this may have no effect the second time on the same type of divide, but it doesn't hurt to reapply
    // let dividedMatrix;
    // if (quarterSections.includes(section)) {
    //   dividedMatrix = getQuarterSectionedMatrix();
    // } else if (halfSections.includes(section)) {
    //   dividedMatrix = getHalfSectionedMatrix();
    // } else {
    //   // drawing full screen, no need to draw any divided
    //   dividedMatrix = preparedMatrix;
    // }
    // const sectionedMatrix = combineTwoMatrix(preparedMatrix, dividedMatrix);

    // then append the new matrix data to the cleaned one
    const combinedMatrix = combineTwoMatrix(
      preparedMatrix,
      partialMatrixBooleanArray,
      { startCol: offsets.startCol, startRow: offsets.startRow }
    );

    flipdot.send(combinedMatrix);

    // Update the most latest displayed matrix
    currentMatrix = combinedMatrix;

    if (process.env.NODE_ENV === 'development') {
      logMatrix(currentMatrix);
    }

    res.send(`Displaying a combined matrix`);
  } else {
    flipdot.writeText(message, fontOptions);

    flipdot.send();
    res.send(`Displaying "${message}" using "${font}" font`);
  }
  // triggers a DB write with this message
  if (process.env.NODE_ENV !== 'development') {
    insertMessage(message, font);
  }
});

// allows a matrix to be sent directly to the api, as a true/false array of arrays
app.post('/matrix/', (req, res) => {
  const { matrix, password } = req.body;

  const apiPassword = process.env.TEXT_API_PASSWORD;

  // return an error if the incorrect password is sent
  if (password !== apiPassword) {
    res.status(401).json({ err: 'Incorrect Password' });
    return;
  }

  if (!Array.isArray(matrix)) {
    res.status(400).json({ err: 'Invalid Matrix' });
    return;
  }

  // converts the matrix to bytes then writes it
  flipdot.writeMatrix(matrix);
  flipdot.send();

  currentMatrix = matrix;

  res.send(`Displaying custom matrix`);
});

// returns the message list history when requested
app.get('/history', async (req, res) => {
  const messageHistory = await queryMessageHistory();
  res.json(messageHistory);
});

app.listen(serverPort, () => {
  console.log('https server listening');
});

flipdot.once('error', function (err) {
  console.log(err);
  console.log('an error occured');
});

flipdot.once('close', function () {
  console.log('connection closed');
});

flipdot.once('open', function () {
  const dataSent = flipdot.writeText('Hello', {
    font: 'Banner',
    width: COLUMNS,
    printDirection: 0
  });
  flipdot.send();
});

function saveFont(fontName, message) {
  fs.writeFile('file.txt', data, (err) => {
    if (err) {
      throw err;
    }

    console.log('Data has been written to file successfully.');
  });
}
