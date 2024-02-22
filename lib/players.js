"use strict";
var player1 = {
    currentScore: 0,
    user: ""
};
var player2 = {
    currentScore: 0,
    user: ""
};
function getPlayerScore(player) {
    return player == 1 ? player1.currentScore : player2.currentScore;
}
function addPlayerScore(player, addScore) {
    player == 1 ? player1.currentScore = player1.currentScore + addScore :
        player2.currentScore = player2.currentScore + addScore;
}
function resetScores() {
    player1.currentScore = 0;
    player2.currentScore = 0;
}
function setUserName(player, userName) {
    player == 1 ? player1.user = userName : player2.user = userName;
}
