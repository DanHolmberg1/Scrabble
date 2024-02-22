"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player1 = {
    currentScore: 0,
    user: "",
    currentWord: [],
};
var player2 = {
    currentScore: 0,
    user: "",
    currentWord: [],
};
function getPlayerScore(player) {
    return player == 1 ? player1.currentScore : player2.currentScore;
}
function addPlayerScore(player, addScore) {
    player == 1
        ? (player1.currentScore = player1.currentScore + addScore)
        : (player2.currentScore = player2.currentScore + addScore);
}
function resetScores() {
    player1.currentScore = 0;
    player2.currentScore = 0;
}
function setUserName(player, userName) {
    player == 1 ? (player1.user = userName) : (player2.user = userName);
}
function resetCurrentWord() {
    player1.currentWord = [];
    player2.currentWord = [];
}
function addToCurrentWord(player, currentCell) {
    player == 1 ? player1.currentWord.push(currentCell)
        : player2.currentWord.push(currentCell);
}
function removeFromCurrentWord(player, currentCell) {
    var playerWord = (player == 1 ? player1.currentWord
        : player2.currentWord);
    var index = playerWord.indexOf(currentCell);
    if (index > -1) {
        playerWord.splice(index, 1);
    }
}
function getCurrentWord(player) {
    return player == 1 ? player1.currentWord : player2.currentWord;
}
