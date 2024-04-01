import type { DotMatrix } from '@/types/flipdot';
import SIZE from '@/config/size';

interface SizeObject {
  width: number;
  height: number;
}

/** Creates an unlit matrix with the specified width/height */
export const emptyMatrix = (size: SizeObject = SIZE) => {
  const matrix: DotMatrix = {};

  for (let y = 0; y < size.height; y++) {
    matrix[y] = {};
    for (let x = 0; x < size.width; x++) {
      matrix[y][x] = {
        col: x,
        row: y,
        lit: false
      };
    }
  }

  return matrix;
};

/** Returns a matrix of random on/off values */
export const randomMatrix = (size: SizeObject) => {
  const matrix: DotMatrix = emptyMatrix(size);

  for (const row in matrix) {
    for (const col in matrix[row]) {
      matrix[row][col].lit = Math.random() > 0.5;
    }
  }

  return matrix;
};

export const applyArrayToMatrix = (dataArray: string[]) => {
  const matrix = emptyMatrix();

  // no point going higher or wider than the screen allows
  const rowMax = Math.min(SIZE.height, dataArray.length);

  for (let row = 0; row < rowMax; row++) {
    const colMax = Math.min(SIZE.width, dataArray[row].length);
    for (let dotIndex = 0; dotIndex < colMax; dotIndex++) {
      if (dataArray[row][dotIndex] === 'X') {
        matrix[row][dotIndex].lit = true;
      }
    }
  }

  return matrix;
};

/**
 * Takes in a matrix, and center alignes it on both axis if it can be
 * @param matrix The matrix to be center aligned
 */
export const centerAlignMatrix = (matrix: DotMatrix) => {
  let earliestX = SIZE.width;
  let earliestY = SIZE.height;

  let latestX = 0;
  let latestY = 0;

  // in case it's a blank screen, don't bother checking as it'll cause some error
  let pixelFound = false;

  // iterate over the matrix first to gather the first/last positions of each axis
  for (let row in matrix) {
    for (const col in matrix[row]) {
      if (matrix[row][col].lit) {
        pixelFound = true;
        earliestX = Math.min(earliestX, Number(col));
        earliestY = Math.min(earliestY, Number(row));

        latestX = Math.max(latestX, Number(col));
        latestY = Math.max(latestY, Number(row));
      }
    }
  }

  if (!pixelFound) {
    return matrix;
  }

  // for now, half the distance of the gap to the right is how much it needs shifting down by
  let rightNudge = Math.floor((SIZE.width - latestX) / 2) - 1;
  let downNudge = Math.floor((SIZE.height - latestY) / 2) - 1;

  // if there's no  space to nudge it on both axis, then it's as centered as it can be
  if (rightNudge <= 0 && downNudge <= 0) {
    return matrix;
  }

  if (downNudge <= 0) {
    downNudge = 0;
    earliestY = 0;
  }

  if (rightNudge <= 0) {
    rightNudge = 0;
    earliestX = 0;
  }

  // get an empty matrix, then add centered text to it
  const centeredMatrix = emptyMatrix();

  // start at the highest appearance of a row with a dot, until the lowest
  for (let row = earliestY; row <= latestY; row++) {
    // then start at the first leftmode appearance, until the rightest
    for (let col = earliestX; col <= latestX; col++) {
      // apply the original matrix state to the nudged value in the new matrix
      // This works assuming the uncentered matrix was top-left aligned
      centeredMatrix[row + downNudge][col + rightNudge].lit =
        matrix[row][col].lit;
    }
  }

  return centeredMatrix;
};

// takes in the JS matrix object, and converts it to a 2d boolean array
export const convertMatrixToBooleanArray = (matrix: DotMatrix) => {
  const booleanMatrix = [];
  debugger;
  for (let row in matrix) {
    const matrixRow = [];

    for (const col in matrix[row]) {
      // add the lit boolean to the array
      matrixRow.push(matrix[row][col].lit);
    }

    booleanMatrix.push(matrixRow);
  }

  return booleanMatrix;
};
