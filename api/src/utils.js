const SIZE = require('./size.js');

/* Returns a full size empry matrix */
const getEmptyMatrix = (setToValue = false) => {
  const matrix = new Array(SIZE.HEIGHT);

  for (let row = 0; row < matrix.length; row++) {
    matrix[row] = new Array(SIZE.WIDTH).fill(setToValue);
  }

  return matrix;
};

const getOffsetPositions = (sectionName) => {
  /**
   * The sections can be:
   * 'topleft',
   * 'topright',
   * 'bottomleft',
   * 'bottomright',
   * 'top',
   * 'bottom'
   * 'all'
   */

  const fullHeight = SIZE.HEIGHT;
  const fullWidth = SIZE.WIDTH;
  const halfHeight = fullHeight / 2;
  const halfWidth = fullWidth / 2;

  let startRow = 0;
  let startCol = 0;
  let endRow = fullHeight;
  let endCol = fullWidth;

  switch (sectionName) {
    case 'topleft':
      endRow = halfHeight;
      endCol = halfWidth;
      break;

    case 'topright':
      startCol = halfWidth;
      endRow = halfHeight;
      break;

    case 'bottomleft':
      startRow = halfHeight;
      endCol = halfWidth;
      break;

    case 'bottomright':
      startRow = halfHeight;
      startCol = halfWidth;
      break;

    case 'top':
      endRow = halfHeight;
      break;

    case 'bottom':
      startRow = halfHeight;
      break;

    case 'all':
      // uses 0 through to the end, the default values
      break;
  }

  return { startRow, endRow, startCol, endCol };
};

// wipe a specific section from the provided matrix
const getPartiallyCleanedMatrix = (sectionName, matrix, setToValue = false) => {
  const { startRow, endRow, startCol, endCol } =
    getOffsetPositions(sectionName);

  // now we know the start/end bounds to wipe
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      matrix[row][col] = setToValue;
    }
  }

  return matrix;
};

/* Returns a matrix horizontally split into 2 segments */
const getHalfSectionedMatrix = () => {
  const matrix = getEmptyMatrix();
  const halfwayRow = Math.floor(SIZE.HEIGHT / 2);

  // set the center row to be true
  matrix[halfwayRow] = new Array(SIZE.WIDTH).fill(true);

  return matrix;
};

/* Returns a matrix split into 4 quarters */
const getQuarterSectionedMatrix = () => {
  const matrix = getEmptyMatrix();

  const halfwayRow = Math.floor(SIZE.HEIGHT / 2);
  const halfwayCol = Math.floor(SIZE.WIDTH / 2) - 1;

  // set the center row to be true
  matrix[halfwayRow] = new Array(SIZE.WIDTH).fill(true);

  // set the center led on each col to be true
  matrix.forEach((row) => (row[halfwayCol] = true));

  return matrix;
};

/** Applies any active cells in matrixToAdd onto the matrix */
const combineTwoMatrix = (
  matrix,
  matrixToAdd,
  config = {
    startCol: 0,
    startRow: 0,
    colsToAdd: undefined,
    rowsToAdd: undefined
  }
) => {
  const combined = [...matrix];

  // to make adding a small section of the matrix easier, you can provide a cap so it doesn't overwrite too much to the right/below
  const rowsToAdd = config.rowsToAdd || matrixToAdd.length - 1;
  const colsToAdd = config.colsToAdd || matrixToAdd[0].length - 1;

  for (let row = 0; row < rowsToAdd; row++) {
    for (let col = 0; col < colsToAdd; col++) {
      if (matrixToAdd[row][col] === true) {
        // offset where abouts it writes onto the matrix, so quadrants can be targeted
        const colToWrite = col + config.startCol;
        const rowToWrite = row + config.startRow;

        // this can happen with large fonts which are bigger than the matrix they are being added to
        // doing continue here will just crop them off
        if (
          combined[rowToWrite] === undefined ||
          combined[rowToWrite][colToWrite] === undefined
        ) {
          continue;
        }

        combined[rowToWrite][colToWrite] = true;
      }
    }
  }

  return combined;
};

const convertAsciiToBooleanMatrix = (asciiArray) => {
  // this replaces everything that isn't a space, or a new line character, into true
  const asciiRows = asciiArray.map((row) =>
    row.split('').map((char) => char !== ' ')
  );

  let firstRowWithContent = asciiRows.length;

  // find the first row which is not blank, and then remove the blanks from the top
  asciiRows.forEach((row, index) => {
    if (row.includes(true)) {
      firstRowWithContent = Math.min(firstRowWithContent, index);
    }
  });

  // cut out the initial leading rows that were blank
  asciiRows.splice(0, firstRowWithContent);

  return asciiRows;
};

module.exports = {
  getEmptyMatrix,
  getHalfSectionedMatrix,
  getQuarterSectionedMatrix,
  combineTwoMatrix,
  getPartiallyCleanedMatrix,
  getOffsetPositions,
  convertAsciiToBooleanMatrix
};
