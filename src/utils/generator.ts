const rotate = (matrix: Array<Array<any>>) => {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
}

const generate = (size: number): boolean[][] => {
  const MIN_SIZE = 2;

  if (size < MIN_SIZE) {
    // Square grille with size less than 2x2 makes no sense.
    throw new Error(`Size argument must be more than ${MIN_SIZE}.`);
  }

  if (size % 2 !== 0) {
    // Square grille side must have even size to prevent overlap holes.
    throw new Error("Size argument must be even.")
  }

  // Create a quarter
  const topLeftQuarter: number[][] = [];

  for (let i = 0; i < size / 2; i++) {
    topLeftQuarter.push([]);
    for (let j = 0; j < size / 2; j++) {
      topLeftQuarter[i][j] = i * size / 2 + j;
    }
  }

  // 90deg
  const bottomLeftQuarter = rotate(topLeftQuarter);
  // 180deg
  const bottomRightQuarter = rotate(bottomLeftQuarter);
  // 270deg
  const topRightQuarter = rotate(bottomRightQuarter);

  // Create and fill the grille using quarters
  const grille: number[][] = [];
  const offset = size / 2;

  for (let i = 0; i < size; i++) {
    grille.push([]);
    for (let j = 0; j < size; j++) {
      if (i < size / 2 && j < size / 2) {
        grille[i][j] = topLeftQuarter[i][j];
      }

      if (i >= size / 2 && j < size / 2) {
        grille[i][j] = topRightQuarter[i - offset][j];
      }

      if (i >= size / 2 && j >= size / 2) {
        grille[i][j] = bottomRightQuarter[i - offset][j - offset];
      }

      if (i < size / 2 && j >= size / 2) {
        grille[i][j] = bottomLeftQuarter[i][j - offset];
      }
    }
  }
  console.log(grille);

  // Now the grille is filled with numbers from 0 to size * 2, 
  // where each next quarter rotated by 90deg

  // Create random holes using the following rules:
  // 1. Hole can be made only in 1 of 4 quarter (algorithm requirement)
  // 2. Hole should't be connected with another hole (increases security)

  // TODO

  return [];
}

export default generate;