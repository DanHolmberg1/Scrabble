"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomLetters = void 0;
var q = require("./queue_array");
/**
 * Generates a queue of random letters reflecting the distribution and frequency of letters as specified in the rules of Scrabble.
 * The function creates an array of letters mirroring Scrabble's letter distribution, shuffles this array to randomize the order,
 * and then enqueues each letter into a queue. This simulated bag of letters can then be used for game mechanics,
 * closely mimicking the experience of drawing letter tiles from a bag in a game of Scrabble.
 *
 * @example
 * const letterQueue = generateRandomLetters(); // Returns a queue with letters randomized in accordance with Scrabble distribution.
 *
 * @returns {q.Queue<string>} A queue populated with letters distributed and randomized according to Scrabble rules, ready for gameplay.
 */
function generateRandomLetters() {
    var letters = [
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "I",
        "I",
        "I",
        "I",
        "I",
        "I",
        "I",
        "I",
        "I",
        "O",
        "O",
        "O",
        "O",
        "O",
        "O",
        "O",
        "O",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "L",
        "L",
        "L",
        "L",
        "S",
        "S",
        "S",
        "S",
        "U",
        "U",
        "U",
        "U",
        "D",
        "D",
        "D",
        "D",
        "G",
        "G",
        "G",
        "B",
        "B",
        "C",
        "C",
        "M",
        "M",
        "P",
        "P",
        "F",
        "F",
        "H",
        "H",
        "V",
        "V",
        "W",
        "W",
        "Y",
        "Y",
        "K",
        "J",
        "X",
        "Q",
        "Z",
    ];
    var randomLetters = q.empty();
    var lettersScrambled = shuffle(letters);
    for (var i = 0; i < lettersScrambled.length; i++) {
        q.enqueue(lettersScrambled[i], randomLetters);
    }
    return randomLetters;
}
exports.generateRandomLetters = generateRandomLetters;
/**
 * Shuffles the elements of an array in place using the Fisher-Yates shuffle algorithm.
 * his algorithm ensures that each permutation of the array elements is equally likely.
 *
 * @example
 * shuffle(["A", "B", "C", "D"]); // might return ["C", "A", "D", "B"]
 *
 * @param {Array<string>} array - The array of strings to be shuffled.
 * @returns {Array<string>} Returns the same array with its elements reordered randomly.
 */
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
