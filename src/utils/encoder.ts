import { alphabets } from "../constants";
import { getRandomNumber, rotateMatrix } from "./common";

const findAlphabetIndexes = (message: string, alphabets: string[]): number[] => {
  // Normalize the message to a set of unique characters
  const messageChars = new Set(message);
  const indexes: number[] = [];

  alphabets.forEach((alphabet, index) => {
    const alphabetChars = new Set(alphabet);

    // Check if at least one character of the alphabet is present in the message
    let atLeastOneCharFound = false;

    for (const char of alphabetChars) {
      if (messageChars.has(char)) {
        atLeastOneCharFound = true;
        break; // Stop checking once we find a matching character
      }
    }

    // If at least one character is found, add the index to the result array
    if (atLeastOneCharFound) {
      indexes.push(index);
    }
  });

  return indexes;
}

const chunkString = (str: string, len: number): string[] => {
  const size = Math.ceil(str.length / len);
  const result = Array(size);
  let offset = 0;
  
  for (let i = 0; i < size; i++) {
    result[i] = str.substring(offset, offset + len);
    offset += len;
  }
  
  return result;
};

const getRandomLetters = (message: string, grille: boolean[][]): string => {
  const alphabetsUsed = findAlphabetIndexes(message, alphabets);
  const chunkSize = Math.pow(grille.length / 2, 2) * 4;
  let trashCharsCount = chunkSize - message.length % chunkSize;
  let result = '';
  // If chunk is not fullfilled then fill it with random characters of the same alphabet(s)
  while (trashCharsCount > 0) {
    // Find which alphabets are used
    const randomAlphabetIndex = alphabetsUsed.length > 0 ? getRandomNumber(0, alphabetsUsed.length) : 0;
    const randomChar = alphabets[randomAlphabetIndex].charAt(Math.floor(Math.random() * alphabets[randomAlphabetIndex].length));
    result += randomChar;
    trashCharsCount--;
  }

  return '';
}

const encodeMessage = (message: string, grille: boolean[][], trash?: string): string[][][] => {
  grille.forEach(row => {
    if (row.length !== grille.length) {
      throw new Error('Grille should be a square matrix');
    }
  })

  // Split message intro chunks where each chunk is an array of grille size
  const chunkSize = Math.pow(grille.length / 2, 2) * 4;
  const chunks = chunkString(message.replaceAll(' ','').toUpperCase(), chunkSize);
  // Add trash to the last chunk to make it size of chunkSize
  if (trash) chunks[chunks.length - 1] += trash;

  // Create tables from chunks using grille
  const tables = []

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    let currentCharIndex = 0;
    const table = new Array(grille.length).fill(null).map(() => new Array(grille.length).fill(null));
    let times = 4;

    debugger;

    // Rotate grille 4 times and fill the table
    while (times > 0) {
      for (let x = 0; x < grille.length; x++) {
        for (let y = 0; y < grille[x].length; y++) {
          if (grille[x][y]) {
            table[x][y] = chunk[currentCharIndex];
            currentCharIndex++;
          }
        }
      }

      grille = rotateMatrix(grille);
      times--;
    }

    tables.push(table);
  }

  return tables;
}

const encode = (message: string, grille: boolean[][]): string[][][] => {
  const trash = getRandomLetters(message, grille);
  return encodeMessage(message, grille, trash);
}

const testExports = {
 encodeMessage
}

export { encode, testExports };