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
/**
 * Returns the current score of the chosen player
 *
 * @example
 * getPlayerScore(1) returns 0 at the start of the program,
 * since it is the defaultscore of player 1
 *
 * @param {PlayerNumber} player - determines which player to get score from
 * @returns {number} Returns currentScore of player1 or player2
 */
function getPlayerScore(player) {
    return player == 1 ? exports.player1.currentScore : exports.player2.currentScore;
}
exports.getPlayerScore = getPlayerScore;
/**
 * Takes input score and adds it to the chosen players current score
 * @param {PlayerNumber} player - determines which player to add score to
 * @param {number} addScore - the amount to add to currentScore
 */
function addPlayerScore(player, addScore) {
    player == 1
        ? (exports.player1.currentScore = exports.player1.currentScore + addScore)
        : (exports.player2.currentScore = exports.player2.currentScore + addScore);
}
exports.addPlayerScore = addPlayerScore;
/**
 * Sets the current score of all players to 0
 */
function resetScores() {
    exports.player1.currentScore = 0;
    exports.player2.currentScore = 0;
}
exports.resetScores = resetScores;
/**
 * Changes the chosen players username to the given name
 * @param {PlayerNumber} player - determines which player to change username
 * @param {string} userName - the new username for the player
 */
function setUserName(player, userName) {
    player == 1 ? (exports.player1.user = userName) : (exports.player2.user = userName);
}
exports.setUserName = setUserName;
/**
 * Empties the currenWord of all players
 */
function resetCurrentWord() {
    exports.player1.currentWords = [];
    exports.player2.currentWords = [];
}
exports.resetCurrentWord = resetCurrentWord;
/**
 * Adds the given cell to currentWord of the chosen player
 * @param {PlayerNumber} player - determines which player to add the cell to
 * @param {cell<number, string>} currentCell - the cell to add to currentWord
 */
function addToCurrentWord(player, currentCell) {
    player == 1
        ? exports.player1.currentWords.push(currentCell)
        : exports.player2.currentWords.push(currentCell);
}
exports.addToCurrentWord = addToCurrentWord;
/**
 * Removes the given cell from currenWord of the chosen player.
 * Does nothing if the cell does not exist in currentWord
 * @param {PlayerNumber} player - determines which player to remove the cell from
 * @param {cell<number, string>} currentCell - the cell ro remove from currentWord
 */
function removeFromCurrentWord(player, currentCell) {
    var playerWord = player == 1 ? exports.player1.currentWords : exports.player2.currentWords;
    var index = playerWord.indexOf(currentCell);
    if (index > -1) {
        playerWord.splice(index, 1);
    }
}
exports.removeFromCurrentWord = removeFromCurrentWord;
/**
 * Returns the currentWord array from the given player
 * @param {PlayerNumber} player - determines which player to get currentWord from.
 * @returns {Array<cell<number, string>>} - returns the array of cells from currentWord.
 */
function getCurrentWord(player) {
    return player == 1 ? exports.player1.currentWords : exports.player2.currentWords;
}
exports.getCurrentWord = getCurrentWord;
/**
 * Returns the user with matching username from saved data.
 * Returns an empty user if username is not found.
 * @param {string} userName - searches for user with this name
 * @returns {User} - Returns the User with matching username or an empty User.
 */
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
/**
 * If current score of any player is higher than the highscore of paired User
 * the highscore will be overwritten by the current score.
 * Applies to all players
 */
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
/**
 * Creates a new User with given name and password and saves it to save data.
 * @param {string} username - username for new User
 * @param {string }password - password for new User
 */
function makeNewUser(username, password) {
    var users = (0, saveData_1.getUsers)();
    var newUser = { userName: username, password: password, highScore: 0 };
    users.push(newUser);
    (0, saveData_1.saveUsers)(users);
}
exports.makeNewUser = makeNewUser;
