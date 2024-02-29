"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNewUser = exports.updateHighscore = exports.findUser = exports.getCurrentWord = exports.removeFromCurrentWord = exports.addToCurrentWord = exports.resetCurrentWord = exports.setUserName = exports.resetScores = exports.addPlayerScore = exports.getPlayerScore = exports.player2 = exports.player1 = void 0;
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
        else {
            i++;
        }
    }
    var emptyUser = { userName: "", password: "", highScore: 0 };
    return emptyUser;
}
exports.findUser = findUser;
function updateHighscore() {
    var user1 = findUser(exports.player1.user);
    var user2 = findUser(exports.player2.user);
    var newUserArray = (0, saveData_1.getUsers)();
    var userIndex = 0;
    var userIndex2 = 0;
    while (userIndex < newUserArray.length) {
        if (newUserArray[userIndex].userName == user1.userName) {
            break;
        }
        else {
            userIndex++;
        }
    }
    if (exports.player1.user !== "") {
        if (exports.player1.currentScore > user1.highScore || user1.userName !== "") {
            newUserArray[userIndex].highScore = exports.player1.currentScore;
        }
    }
    while (userIndex2 < newUserArray.length) {
        if (newUserArray[userIndex2].userName == user2.userName) {
            break;
        }
        else {
            userIndex2++;
        }
    }
    if (exports.player2.user !== "") {
        if (exports.player2.currentScore > user2.highScore || user2.userName !== "") {
            newUserArray[userIndex2].highScore = exports.player2.currentScore;
        }
    }
    (0, saveData_1.saveUsers)(newUserArray);
}
exports.updateHighscore = updateHighscore;
function makeNewUser(username, password) {
    var users = (0, saveData_1.getUsers)();
    var newUser = { userName: username, password: password, highScore: 0 };
    users.push(newUser);
    (0, saveData_1.saveUsers)(users);
}
exports.makeNewUser = makeNewUser;
