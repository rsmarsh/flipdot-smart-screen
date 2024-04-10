const SIZE = require('./size.js');

/* Returns a full size empry matrix */
const getEmptyMatrix = () => {
  const matrix = new Array(SIZE.HEIGHT);
  matrix.fill(new Array(SIZE.WIDTH).fill(false));

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
  config = { startCol: 0, startRow: 0 }
) => {
  for (let row = 0; row < matrixToAdd.length; row++) {
    for (let col = 0; col < matrixToAdd.length; col++) {
      if (matrixToAdd[row][col] === true) {
        // offset where abouts it writes onto the matrix, so quadrants can be targeted
        const colToWrite = col + config.startCol;
        const rowToWrite = row + config.startRow;

        matrix[rowToWrite][colToWrite] = true;
      }
    }
  }
};

module.exports = {
  getEmptyMatrix,
  getHalfSectionedMatrix,
  getQuarterSectionedMatrix,
  combineTwoMatrix
};
