"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWordsOnBoard = void 0;
var memo = [];
var library = [];
fetch("libCollins Scrabble Words (2019).txt")
    .then(function (response) { return response.text(); })
    .then(function (text) {
    library = text.split(/\r?\n/);
})
    .catch(function (error) { return console.error("Error loading the words file:", error); });
console.log(library[30]);
var isValidWord = function (word) {
    return memo.includes(word);
};
function binarySearch(dictionary, target) {
    var low = 0;
    var high = dictionary.length - 1;
    while (low <= high) {
        var mid = Math.floor(low + (high - low) / 2);
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
function checkWordsOnBoard(gameBoard) {
    var words = [];
    // Helper function to get the character at a specific position
    var getCharAt = function (row, col) {
        if (row < gameBoard.length && col < gameBoard[row][0].length) {
            return gameBoard[row][0][col].char;
        }
        return ""; // Return empty string for out-of-bounds
    };
    // Check horizontally and vertically from each cell
    for (var row = 0; row < gameBoard.length; row++) {
        for (var col = 0; col < gameBoard[row][0].length; col++) {
            var wordHorizontal = "";
            var wordVertical = "";
            // Check right
            for (var j = col; j < gameBoard[row][0].length && getCharAt(row, j) !== ""; j++) {
                wordHorizontal += getCharAt(row, j);
            }
            // Check down
            for (var i = row; i < gameBoard.length && getCharAt(i, col) !== ""; i++) {
                wordVertical += getCharAt(i, col);
            }
            if (wordHorizontal.length > 1)
                words.push(wordHorizontal);
            if (wordVertical.length > 1)
                words.push(wordVertical);
        }
    }
    var memoCheck = words.filter(function (word) { return isValidWord(word); });
    var validWords = words.filter(function (word) { return !binarySearch(library, word); });
    memoCheck;
    if (validWords.length == 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkWordsOnBoard = checkWordsOnBoard;
