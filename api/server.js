require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const API_PORT = 3001;
const fs = require('fs');
const SIZE = require('./src/size.js');

const { insertMessage, queryMessageHistory } = require('./db.js');
const {
  getEmptyMatrix,
  getOffsetPositions,
  combineTwoMatrix,
  getPartiallyCleanedMatrix,
  convertAsciiToBooleanMatrix
  // getQuarterSectionedMatrix,
  // getHalfSectionedMatrix
} = require('./src/utils.js');
const FlipdotDisplay = require('./src/flipdot.js');

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

const flipdotConfig = {
  // logs every internal event seen by the flipdot library
  debug: false,
  devMode: process.env.NODE_ENV === 'development',
  port: '/dev/ttyUSB0', // 'COM3' = Windows USB port
  address: 1,
  rows: SIZE.HEIGHT,
  columns: SIZE.WIDTH,
  initialMessage: 'Hello' // TODO doesn't work, fires too soon?
};

const flipdot = new FlipdotDisplay(flipdotConfig);

app.use(express.json());

app.use(cors());
// No longer exposing the screen api publicly, all traffic will come from internal services
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) === -1 && origin !== undefined) {
//         var msg = 'Not in CORS allow list';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   })
// );

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
    // this was COLUMNS before, might need fixing if it didn't always want to be full width
    width: SIZE.WIDTH,
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

    // Gets a matrix for the message without updating the display
    const partialMatrixData = flipdot.getMatrixFromText(message, fontOptions);

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

    // TODO, confirm this as working, it was using flipdot.send(combinedMatrix) before
    flipdot.showMatrix(combinedMatrix);

    // Update the most latest displayed matrix
    currentMatrix = combinedMatrix;

    if (process.env.NODE_ENV === 'development') {
      logMatrix(currentMatrix);
    }

    res.send(`Displaying a combined matrix`);
  } else {
    flipdot.showText(message, fontOptions);

    res.send(`Displaying "${message}" using "${font}" font`);
  }
  // triggers a DB write with this message
  if (process.env.NODE_ENV.trim() !== 'development') {
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

  flipdot.showMatrix(matrix);

  currentMatrix = matrix;

  res.send(`Displaying custom matrix`);
});

// returns the message list history when requested
app.get('/history', async (req, res) => {
  const messageHistory = await queryMessageHistory();
  res.json(messageHistory);
});

app.listen(API_PORT, () => {
  console.log('Express server listening');
});

function saveFont(fontName, message) {
  fs.writeFile('file.txt', data, (err) => {
    if (err) {
      throw err;
    }

    console.log('Data has been written to file successfully.');
  });
}
