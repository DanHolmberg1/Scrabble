"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWordsOnBoard = void 0;
/**
 * Performs a binary search on a sorted array of strings to find a target word efficiently.
 * This function assumes the dictionary is sorted alphabetically.
 *
 * @example
 * binarySearch(["apple", "banana", "cherry"], "banana"); // returns true
 *
 * @param {string[]} dictionary - The sorted array of words to search through.
 * @param {string} target - The word to search for in the dictionary.
 * @returns {boolean} Returns true if the target word is found in the dictionary, otherwise false.
 */
function binarySearch(dictionary, target) {
    var low = 0;
    var high = dictionary.length - 1;
    while (low <= high) {
        var mid = Math.floor((low + high) / 2);
        var guess = dictionary[mid];
        if (guess === target) {
            return true; // Word found
        }
        if (guess < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return false; // Word not found
}
/**
 * Validates the words formed on the game board against a provided dictionary. It checks both horizontally
 * and vertically formed words, ensuring they are valid and do not consist of isolated letters. Additionally,
 * this function verifies that there are no "free-floating" letters on the board, enhancing the game's integrity.
 *
 * @example
 * checkWordsOnBoard(gameBoard, library); // returns true if all words on the board are valid according to the library
 *
 * @param {Array<Array<cell<number, string>>>} gameBoard - The game board represented as a 2D array of cells.
 * @param {string[]} library - A list of valid words used as a reference to validate the words on the board.
 * @returns {boolean} Returns true if all words on the board are valid and there are no isolated letters, otherwise false.
 */
function checkWordsOnBoard(gameBoard, library) {
    var words = [];
    // Helper function to get the character at a specific position
    var getCharAt = function (row, col) {
        if (row < gameBoard.length && col < gameBoard[row].length) {
            return gameBoard[row][col].char;
        }
        return ""; // Return empty string for out-of-bounds
    };
    // Improved word collection to avoid adding all subwords indiscriminately
    for (var row = 0; row < gameBoard.length; row++) {
        var wordHorizontal = "";
        for (var col = 0; col < gameBoard[row].length; col++) {
            // Continue building the word if the cell is not empty
            if (getCharAt(row, col) !== "") {
                wordHorizontal += getCharAt(row, col);
            }
            // If the next cell is empty or it's the last cell in the row, and the current word is valid, add it to the list
            if (getCharAt(row, col + 1) === "" || col === gameBoard[row].length - 1) {
                if (wordHorizontal.length > 1)
                    words.push(wordHorizontal);
                wordHorizontal = ""; // Reset for the next word
            }
        }
    }
    // Repeat the same logic for vertical words
    for (var col = 0; col < gameBoard[0].length; col++) {
        var wordVertical = "";
        for (var row = 0; row < gameBoard.length; row++) {
            if (getCharAt(row, col) !== "") {
                wordVertical += getCharAt(row, col);
            }
            if (getCharAt(row + 1, col) === "" || row === gameBoard.length - 1) {
                if (wordVertical.length > 1)
                    words.push(wordVertical);
                wordVertical = ""; // Reset for the next word
            }
        }
    }
    var hasFreeFlowingLetters = gameBoard.some(function (row, rowIndex) { return row.some(function (cell, colIndex) {
        if (cell.char !== "") { // Check only non-empty cells
            var adjacentCells = [
                rowIndex > 0 ? getCharAt(rowIndex - 1, colIndex) : "", // Up, check boundary
                rowIndex < gameBoard.length - 1 ? getCharAt(rowIndex + 1, colIndex) : "", // Down, check boundary
                colIndex > 0 ? getCharAt(rowIndex, colIndex - 1) : "", // Left, check boundary
                colIndex < row.length - 1 ? getCharAt(rowIndex, colIndex + 1) : "" // Right, check boundary
            ];
            // Check if all adjacent cells are empty (i.e., the letter is free-flowing)
            return adjacentCells.every(function (adjacent) { return adjacent === ""; });
        }
        return false; // Skip empty cells
    }); });
    if (hasFreeFlowingLetters) {
        return false; // Invalid board due to a free-flowing letter
    }
    console.log(words);
    // Filter for valid words according to the dictionary
    var validWords = words.filter(function (word) { return binarySearch(library, word); });
    // If all collected words are valid, return true; otherwise, false
    return validWords.length === words.length;
}
exports.checkWordsOnBoard = checkWordsOnBoard;
