const rotateMatrix = (matrix: Array<Array<any>>) => {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomSeed = (quarterSize: number) => {
  let previousIndex: number | undefined;
  let randomIndex = 0;
  const seeds = [];

  for (let i = 0; i < quarterSize; i++) {
    randomIndex = getRandomNumber(0, 3);

    // Regenerates the index while it the same as the previous one
    while (previousIndex === randomIndex) {
      randomIndex = getRandomNumber(0, 3);
    }

    seeds.push(randomIndex);
    previousIndex = randomIndex;
  }

  return seeds;
}

const generateGrille = (size: number, seed: number[]): boolean[][] => {
  const MIN_SIZE = 2;
  const quarterSize = Math.pow(size / 2, 2);
  const seeds = seed.slice(0);

  if (size < MIN_SIZE) {
    // Square grille with size less than 2x2 makes no sense
    throw new Error(`Size argument must be more than ${MIN_SIZE}.`);
  }

  if (size % 2 !== 0) {
    // Square grille side must have even size to prevent overlap holes
    throw new Error("Size argument must be even.")
  }

  if (seed.length !== quarterSize) {
    // Seed length must be equal quarter size (number of holes)
    throw new Error(`Expected ${quarterSize} length array, but provided ${seed.length}`);
  }

  for (let i = 0; i < seed.length; i++) {
    if (seed[i] < 0 || seed[i] > 3) {
      // Each seed item should be from 0 to 3 due matrix has 4 quarters
      throw new Error(`Expected values from 0 to 3 for each seed item, but ${i} item has value of ${seed[i]}`);
    }
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
  const bottomLeftQuarter = rotateMatrix(topLeftQuarter);
  // 180deg
  const bottomRightQuarter = rotateMatrix(bottomLeftQuarter);
  // 270deg
  const topRightQuarter = rotateMatrix(bottomRightQuarter);

  // Create and fill the matrix using quarters
  const matrix: number[][] = [];
  const offset = size / 2;

  for (let i = 0; i < size; i++) {
    matrix.push([]);
    for (let j = 0; j < size; j++) {
      if (i < size / 2 && j < size / 2) {
        matrix[i][j] = topLeftQuarter[i][j];
      }

      if (i >= size / 2 && j < size / 2) {
        matrix[i][j] = topRightQuarter[i - offset][j];
      }

      if (i >= size / 2 && j >= size / 2) {
        matrix[i][j] = bottomRightQuarter[i - offset][j - offset];
      }

      if (i < size / 2 && j >= size / 2) {
        matrix[i][j] = bottomLeftQuarter[i][j - offset];
      }
    }
  }

  // Now the matrix is filled with numbers, 
  // where each next quarter rotated by 90deg

  // Create random holes using the following rules:
  // 1. Hole can be made only in 1 of 4 quarter (algorithm requirement)
  // 2. Hole should't be connected with another hole (increases security)

  const grille: boolean[][] = new Array(matrix.length).fill(null).map(() => new Array(matrix.length).fill(false));
 

  for (let i = 0; i < quarterSize; i++) {
    // Fill grille using matrix and random index
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        if (matrix[x][y] === i) {
          if (seeds[i] === 0) {
            grille[x][y] = true;
          } else {
            grille[x][y] = false;
          }

          seeds[i]--;
        }
      }
    }
  }

  return grille;
}

const generate = (size: number): boolean[][] => {
  return generateGrille(size, getRandomSeed(Math.pow(size / 2, 2)));
}

export default generate;