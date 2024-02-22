"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomLetters = void 0;
var q = require("./queue_array");
function generateRandomLetters() {
    var letters = [
        "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
        "A", "A", "A", "A", "A", "A", "A", "A", "A",
        "I", "I", "I", "I", "I", "I", "I", "I", "I",
        "O", "O", "O", "O", "O", "O", "O", "O", "N", "N", "N", "N", "N", "N",
        "R", "R", "R", "R", "R", "R",
        "T", "T", "T", "T", "T", "T", "L", "L", "L", "L", "S", "S", "S", "S",
        "U", "U", "U", "U", "D", "D", "D", "D", "G", "G", "G", "B", "B", "C", "C", "M", "M", "P", "P", "F", "F",
        "H", "H", "V", "V", "W", "W", "Y", "Y", "K", "J", "X", "Q", "Z",
    ];
    var randomLetters = q.empty();
    var lettersScrambled = shuffle(letters);
    for (var i = 0; i < lettersScrambled.length; i++) {
        q.enqueue(lettersScrambled[i], randomLetters);
    }
    return randomLetters;
}
exports.generateRandomLetters = generateRandomLetters;
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
