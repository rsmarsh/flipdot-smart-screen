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

console.log(getQuarterSectionedMatrix());

module.exports = {
  getEmptyMatrix,
  getHalfSectionedMatrix,
  getQuarterSectionedMatrix
};
