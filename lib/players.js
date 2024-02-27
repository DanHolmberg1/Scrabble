"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHighscore = exports.getCurrentWord = exports.removeFromCurrentWord = exports.addToCurrentWord = exports.resetCurrentWord = exports.setUserName = exports.resetScores = exports.addPlayerScore = exports.getPlayerScore = exports.player2 = exports.player1 = void 0;
var saveData_1 = require("./saveData");
exports.player1 = {
    currentScore: 0,
    user: "",
    currentWords: [],
};
exports.player2 = {
    currentScore: 0,
    user: "",
    currentWords: [],
};
function getPlayerScore(player) {
    return player == 1 ? exports.player1.currentScore : exports.player2.currentScore;
}
exports.getPlayerScore = getPlayerScore;
function addPlayerScore(player, addScore) {
    player == 1
        ? (exports.player1.currentScore = exports.player1.currentScore + addScore)
        : (exports.player2.currentScore = exports.player2.currentScore + addScore);
}
exports.addPlayerScore = addPlayerScore;
function resetScores() {
    exports.player1.currentScore = 0;
    exports.player2.currentScore = 0;
}
exports.resetScores = resetScores;
function setUserName(player, userName) {
    player == 1 ? (exports.player1.user = userName) : (exports.player2.user = userName);
}
exports.setUserName = setUserName;
function resetCurrentWord() {
    exports.player1.currentWords = [];
    exports.player2.currentWords = [];
}
exports.resetCurrentWord = resetCurrentWord;
function addToCurrentWord(player, currentCell) {
    player == 1
        ? exports.player1.currentWords.push(currentCell)
        : exports.player2.currentWords.push(currentCell);
}
exports.addToCurrentWord = addToCurrentWord;
function removeFromCurrentWord(player, currentCell) {
    var playerWord = player == 1 ? exports.player1.currentWords : exports.player2.currentWords;
    var index = playerWord.indexOf(currentCell);
    if (index > -1) {
        playerWord.splice(index, 1);
    }
}
exports.removeFromCurrentWord = removeFromCurrentWord;
function getCurrentWord(player) {
    return player == 1 ? exports.player1.currentWords : exports.player2.currentWords;
}
exports.getCurrentWord = getCurrentWord;
function findUser(userName) {
    var i = 0;
    var userArray = (0, saveData_1.getUsers)();
    while (i < userArray.length) {
        if (userArray[i].userName == userName) {
            return userArray[i];
        }
    }
}
function updateHighscore() {
}
exports.updateHighscore = updateHighscore;
