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
 
  console.log(matrix);

  for (let i = 0; i < quarterSize; i++) {
    // Fill grille using matrix and random index
    let offset;

    /*
    [tl = 0, tr = 1]
    [bl = 3, br = 2]
    */

    const full = matrix.length;
    const half = matrix.length / 2;

    switch(seeds[i]) {
      case 0:
        offset = {
          y0: 0,
          x0: 0,
          y1: half,
          x1: half,
        }
        break;
      case 1:
        offset = {
          y0: half,
          x0: 0,
          y1: full,
          x1: half,
        }
        break;
      case 2:
        offset = {
          y0: half,
          x0: half,
          y1: full,
          x1: full,
        }
        break;
      case 3:
        offset = {
          x0: half,
          y0: 0,
          x1: full,
          y1: half,
        }
        break;
      default:
        throw new Error(`Expected values from 0 to 3 for each seed item, but ${i} item has value of ${seed[i]}`);
    }

    for (let x = offset.x0; x < offset.x1; x++) {
      for (let y = offset.y0; y < offset.y1; y++) {
        if (matrix[x][y] === i) {
          grille[x][y] = true;
        }
      }
    }
  }

  return grille;
}

const generate = (size: number): boolean[][] => {
  const quarteerSize = Math.pow(size / 2, 2);
  const seed = getRandomSeed(quarteerSize);
  return generateGrille(size, seed);
}

const testExports = {
  generateGrille
}

export { generate, testExports };