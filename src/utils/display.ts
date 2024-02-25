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
