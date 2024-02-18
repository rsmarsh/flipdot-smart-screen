import type { DotMatrix } from '@/types/flipdot';

interface SizeObject {
  width: number;
  height: number;
}

/** Creates an unlit matrix with the specified width/height */
export const emptyMatrix = (size: SizeObject) => {
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
