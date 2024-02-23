"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWord = exports.removeFromCurrentWord = exports.addToCurrentWord = exports.resetCurrentWord = exports.setUserName = exports.resetScores = exports.addPlayerScore = exports.getPlayerScore = void 0;
var player1 = {
    currentScore: 0,
    user: "",
    currentWords: [],
};
var player2 = {
    currentScore: 0,
    user: "",
    currentWords: [],
};
function getPlayerScore(player) {
    return player == 1 ? player1.currentScore : player2.currentScore;
}
exports.getPlayerScore = getPlayerScore;
function addPlayerScore(player, addScore) {
    player == 1
        ? (player1.currentScore = player1.currentScore + addScore)
        : (player2.currentScore = player2.currentScore + addScore);
}
exports.addPlayerScore = addPlayerScore;
function resetScores() {
    player1.currentScore = 0;
    player2.currentScore = 0;
}
exports.resetScores = resetScores;
function setUserName(player, userName) {
    player == 1 ? (player1.user = userName) : (player2.user = userName);
}
exports.setUserName = setUserName;
function resetCurrentWord() {
    player1.currentWords = [];
    player2.currentWords = [];
}
exports.resetCurrentWord = resetCurrentWord;
function addToCurrentWord(player, currentCell) {
    player == 1 ? player1.currentWords.push(currentCell)
        : player2.currentWords.push(currentCell);
}
exports.addToCurrentWord = addToCurrentWord;
function removeFromCurrentWord(player, currentCell) {
    var playerWord = (player == 1 ? player1.currentWords
        : player2.currentWords);
    var index = playerWord.indexOf(currentCell);
    if (index > -1) {
        playerWord.splice(index, 1);
    }
}
exports.removeFromCurrentWord = removeFromCurrentWord;
function getCurrentWord(player) {
    return player == 1 ? player1.currentWords : player2.currentWords;
}
exports.getCurrentWord = getCurrentWord;
