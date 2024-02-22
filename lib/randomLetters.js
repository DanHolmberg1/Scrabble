"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomLetters = void 0;
var q = require("./queue_array");
function generateRandomLetters() {
    var letters = [
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "B",
        "B",
        "C",
        "D",
        "D",
        "D",
        "D",
        "D",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "F",
        "F",
        "G",
        "G",
        "G",
        "H",
        "H",
        "I",
        "I",
        "I",
        "I",
        "I",
        "J",
        "K",
        "K",
        "K",
        "L",
        "L",
        "L",
        "L",
        "L",
        "M",
        "M",
        "M",
        "N",
        "N",
        "N",
        "N",
        "N",
        "O",
        "O",
        "O",
        "O",
        "O",
        "P",
        "P",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "S",
        "S",
        "S",
        "S",
        "S",
        "S",
        "S",
        "S",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "U",
        "U",
        "U",
        "V",
        "V",
        "X",
        "Y",
        "Z",
        "Å",
        "Å",
        "Ä",
        "Ä",
        "Ö",
        "Ö",
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
