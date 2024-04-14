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
   * 'TopLeft',
   * 'TopRight',
   * 'BottomLeft',
   * 'BottomRight',
   * 'Top',
   * 'Bottom'
   */

  const fullHeight = matrix.length;
  const fullWidth = matrix[0].length;
  const halfHeight = fullHeight / 2;
  const halfWidth = fullWidth / 2;

  let startRow = 0;
  let startCol = 0;
  let endRow = fullHeight;
  let endCol = fullWidth;

  switch (sectionName) {
    case 'TopLeft':
      endRow = halfHeight;
      endCol = halfWidth;
      break;

    case 'TopRight':
      startCol = halfWidth;
      endRow = halfHeight;
      break;

    case 'BottomLeft':
      startRow = halfHeight;
      endCol = halfWidth;
      break;

    case 'BottomRight':
      startRow = halfHeight;
      startCol = halfWidth;
      break;

    case 'Top':
      endRow = halfHeight;
      break;

    case 'Bottom':
      startRow = halfHeight;
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
  const rowsToAdd = config.rowsToAdd || matrixToAdd[0].length;
  const colsToAdd = config.colsToAdd || matrixToAdd.length;

  for (let row = 0; row < rowsToAdd; row++) {
    for (let col = 0; col < colsToAdd; col++) {
      if (matrixToAdd[row][col] === true) {
        // offset where abouts it writes onto the matrix, so quadrants can be targeted
        const colToWrite = col + config.startCol;
        const rowToWrite = row + config.startRow;

        combined[rowToWrite][colToWrite] = true;
      }
    }
  }

  return combined;
};

module.exports = {
  getEmptyMatrix,
  getHalfSectionedMatrix,
  getQuarterSectionedMatrix,
  combineTwoMatrix,
  getPartiallyCleanedMatrix,
  getOffsetPositions
};
