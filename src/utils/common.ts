const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rotateMatrix = (matrix: any[][]): any[][] => {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
}

export { getRandomNumber, rotateMatrix };