import { type cell } from "../main";

const memo: string[] = [];

const isValidWord = (word: string): boolean => {
  return memo.includes(word);
};

function binarySearch(dictionary: string[], target: string): boolean {
  let low = 0;
  let high = dictionary.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
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
  gameBoard: Array<Array<cell<number, string>>>,
  library: string[]
): boolean {
  const words: string[] = [];

  // Helper function to get the character at a specific position
  const getCharAt = (row: number, col: number): string => {
    if (row < gameBoard.length && col < gameBoard[row].length) {
      return gameBoard[row][col].char;
    }
    return ""; // Return empty string for out-of-bounds
  };

  // Improved word collection to avoid adding all subwords indiscriminately
  for (let row = 0; row < gameBoard.length; row++) {
    let wordHorizontal = "";
    for (let col = 0; col < gameBoard[row].length; col++) {
      // Continue building the word if the cell is not empty
      if (getCharAt(row, col) !== "") {
        wordHorizontal += getCharAt(row, col);
      }
      // If the next cell is empty or it's the last cell in the row, and the current word is valid, add it to the list
      if (getCharAt(row, col + 1) === "" || col === gameBoard[row].length - 1) {
        if (wordHorizontal.length > 1) words.push(wordHorizontal);
        wordHorizontal = ""; // Reset for the next word
      }
    }
  }

  // Repeat the same logic for vertical words
  for (let col = 0; col < gameBoard[0].length; col++) {
    let wordVertical = "";
    for (let row = 0; row < gameBoard.length; row++) {
      if (getCharAt(row, col) !== "") {
        wordVertical += getCharAt(row, col);
      }
      if (getCharAt(row + 1, col) === "" || row === gameBoard.length - 1) {
        if (wordVertical.length > 1) words.push(wordVertical);
        wordVertical = ""; // Reset for the next word
      }
    }
  }

  console.log(words);
  // Filter for valid words according to the dictionary
  const validWords = words.filter(word => binarySearch(library, word));

  // If all collected words are valid, return true; otherwise, false
  return validWords.length === words.length;
}
