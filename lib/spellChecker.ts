import { type cell } from "../main";

const memo: string[] = [];

let library: string[] = [];

fetch("libCollins Scrabble Words (2019).txt")
  .then((response) => response.text())
  .then((text) => {
    library = text.split(/\r?\n/);
  })
  .catch((error) => console.error("Error loading the words file:", error));

console.log(library[30]);
const isValidWord = (word: string): boolean => {
  return memo.includes(word);
};

function binarySearch(dictionary: string[], target: string): boolean {
  let low = 0;
  let high = dictionary.length - 1;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const guess = dictionary[mid];

    if (guess === target) {
      return true; // Word found
    }

    if (guess < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return false; // Word not found
}

export function checkWordsOnBoard(
  gameBoard: Array<Array<Array<cell<number, string>>>>
): boolean {
  const words: string[] = [];

  // Helper function to get the character at a specific position
  const getCharAt = (row: number, col: number): string => {
    if (row < gameBoard.length && col < gameBoard[row][0].length) {
      return gameBoard[row][0][col].char;
    }
    return ""; // Return empty string for out-of-bounds
  };

  // Check horizontally and vertically from each cell
  for (let row = 0; row < gameBoard.length; row++) {
    for (let col = 0; col < gameBoard[row][0].length; col++) {
      let wordHorizontal = "";
      let wordVertical = "";

      // Check right
      for (
        let j = col;
        j < gameBoard[row][0].length && getCharAt(row, j) !== "";
        j++
      ) {
        wordHorizontal += getCharAt(row, j);
      }

      // Check down
      for (let i = row; i < gameBoard.length && getCharAt(i, col) !== ""; i++) {
        wordVertical += getCharAt(i, col);
      }

      if (wordHorizontal.length > 1) words.push(wordHorizontal);
      if (wordVertical.length > 1) words.push(wordVertical);
    }
  }

  const memoCheck = words.filter((word) => isValidWord(word));
  const validWords = words.filter((word) => !binarySearch(library, word));
  memoCheck;
  if (validWords.length == 0) {
    return true;
  } else {
    return false;
  }
}
