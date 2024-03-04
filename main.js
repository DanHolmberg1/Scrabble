"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTilesDraggable = void 0;
var q = require("./lib/queue_array");
var randomLetters_1 = require("./lib/randomLetters");
var spellChecker_1 = require("./lib/spellChecker");
var endTurn_1 = require("./lib/endTurn");
var pointCounter_1 = require("./lib/pointCounter");
var players_1 = require("./lib/players");
var dfs_1 = require("./lib/dfs");
var login_1 = require("./login");
var submitButton = document.getElementById("submitButton");
var changeLettersButton = document.getElementById("newLetters");
var takeBackTiles = document.getElementById("takeBackLetters");
var gameBoard = [];
var roundScore = 0;
var turn = 0;
var library = [];
var leftLetters = "";
var rightLetters = "";
var letterQueue = (0, randomLetters_1.generateRandomLetters)();
var currentTurnPlacedTiles = [];
//Gets the words from our wordlist.
fetch("lib/Collins Scrabble Words (2019).txt")
    .then(function (response) { return response.text(); })
    .then(function (data) {
    // Split the data into an array using line breaks
    var dataArray = data.split("\n");
    var cleanedArray = dataArray.map(function (row) { return row.replace(/\r/g, ""); });
    library = cleanedArray;
})
    .catch(function (error) { return console.error("Error reading the file:", error); });
/**
 * Initializes and displays the game board on the specified HTML element, creating cells based on the given rows and columns. Each cell is represented by a `cell` object and can have special attributes like double letter score, triple letter score, etc., which are visually indicated on the board.
 *
 * @example
 * const boardElement = document.getElementById("board");
 * createBoard(boardElement, 15, 15, gameBoard); // Initializes a 15x15 game board.
 *
 * @param {HTMLElement} boardElement - The HTML element where the board will be displayed.
 * @param {number} rows - The number of rows in the game board.
 * @param {number} cols - The number of columns in the game board.
 * @param {cell<number, string>[][]} board - The game board data structure to be filled with cell objects.
 * @returns {void}
 */
function createBoard(boardElement, rows, cols, board) {
    for (var row = 0; row < rows; row++) {
        board.push([]);
        var _loop_1 = function (col) {
            board[row].push({ row: row, col: col, special: 0, char: "" });
            var cell = document.createElement("div");
            var id = String(row + " " + col);
            cell.classList.add("cell");
            cell.addEventListener("dragover", function (event) {
                event.preventDefault(); // Allows us to drop.
                cell.classList.add("over"); // Optional: Visual cue.
            });
            cell.addEventListener("drop", function (event) {
                var _a, _b;
                event.preventDefault();
                if (!event.dataTransfer) {
                    throw new Error("event.dataTransfer does not exist");
                }
                var draggableId = event.dataTransfer.getData("text");
                var draggable = document.getElementById(draggableId);
                var dropTargetId = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
                if (draggable && cell && cell.childElementCount == 0) {
                    var tileCharacter_1 = draggable.innerText;
                    var draggableParentId = (_b = draggable.parentElement) === null || _b === void 0 ? void 0 : _b.id;
                    // Identify side/player container and remove character from the corresponding array
                    if (draggableParentId && draggableParentId.includes("leftTiles")) {
                        var found_1 = false; // Flag to indicate removal
                        leftLetters = leftLetters
                            .split("")
                            .filter(function (c) {
                            if (!found_1 && c === tileCharacter_1) {
                                found_1 = true; // Mark that we found and are removing the character
                                return false; // Remove this character
                            }
                            return true; // Keep all other characters
                        })
                            .join("");
                    }
                    else if (draggableParentId &&
                        draggableParentId.includes("rightTiles")) {
                        var found_2 = false; // Flag to indicate removal
                        rightLetters = rightLetters
                            .split("")
                            .filter(function (c) {
                            if (!found_2 && c === tileCharacter_1) {
                                found_2 = true; // Mark that we found and are removing the character
                                return false; // Remove this character
                            }
                            return true; // Keep all other characters
                        })
                            .join("");
                    }
                    // Existing logic for handling a successful drop
                    var onRow = parseInt(dropTargetId.substring(0, dropTargetId.indexOf(" ")));
                    var onColl = parseInt(dropTargetId.substring(dropTargetId.lastIndexOf(" ") + 1));
                    var gameBoardObjNow = gameBoard[onRow][onColl];
                    gameBoardObjNow.char = tileCharacter_1;
                    if (gameBoardObjNow.special !== 0) {
                        cell.innerText = "";
                    }
                    if (turn % 2 === 0) {
                        (0, players_1.addToCurrentWord)(1, gameBoardObjNow);
                        roundScore = (0, pointCounter_1.getPoints)(gameBoard, players_1.player1);
                        var player1_score = document.getElementById("player1Score");
                        if (player1_score)
                            player1_score.innerText = "Score: ".concat((0, players_1.getPlayerScore)(1) + roundScore);
                    }
                    else {
                        (0, players_1.addToCurrentWord)(2, gameBoardObjNow);
                        roundScore = (0, pointCounter_1.getPoints)(gameBoard, players_1.player2);
                        var player2_score = document.getElementById("player2Score");
                        if (player2_score)
                            player2_score.innerText = "Score: ".concat((0, players_1.getPlayerScore)(2) + roundScore);
                    }
                    //console.log(player1.currentWords);
                    ///console.log(gameBoard);
                    //console.log("after");
                    //console.log("spellchecking", checkWordsOnBoard(gameBoard, library));
                    currentTurnPlacedTiles.push({
                        row: onRow, // Assuming these are defined in your drop logic
                        col: onColl,
                        char: tileCharacter_1, // The character of the tile placed
                        origin: (draggableParentId === null || draggableParentId === void 0 ? void 0 : draggableParentId.includes("leftTiles")) ? "left" : "right", // Determine the origin based on draggableParentId
                    });
                    cell.appendChild(draggable);
                    cell.classList.remove("over"); // Cleanup visual cue.
                }
            });
            if (speicalSquares[row][col] === 0) {
                board[row][col].special = 0;
                boardElement.appendChild(cell);
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 1) {
                board[row][col].special = 1;
                cell.setAttribute("data-special", "double-letter");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 2) {
                board[row][col].special = 2;
                cell.setAttribute("data-special", "triple-letter");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 3) {
                board[row][col].special = 3;
                cell.setAttribute("data-special", "double-word");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 4) {
                board[row][col].special = 4;
                cell.setAttribute("data-special", "triple-word");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === -1) {
                board[row][col].special = -1;
                cell.setAttribute("data-special", "starting-square");
                cell.setAttribute("id", id);
            }
            boardElement.appendChild(cell);
        };
        for (var col = 0; col < cols; col++) {
            _loop_1(col);
        }
    }
}
var speicalSquares = [
    [2, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 2],
    [0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0],
    [4, 0, 0, 0, 3, 0, 1, 0, 1, 0, 3, 0, 0, 0, 4],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 3, 0, 0, 0, -1, 0, 0, 0, 3, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [4, 0, 0, 0, 3, 0, 1, 0, 1, 0, 3, 0, 0, 0, 4],
    [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0],
    [0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [2, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 2],
];
/**
 * Makes each tile within the game draggable. It sets up drag event listeners on tiles so that they
 * can be moved to different parts of the game board. This function should be called after the tiles
 * are created and rendered on the page.
 *
 * @example
 * makeTilesDraggable(); // Initializes drag functionality for all tiles with the '.tile' class.
 *
 * @returns {void}
 */
function makeTilesDraggable() {
    // Query all your draggable tiles by a common class or other selector.
    var tiles = document.querySelectorAll(".tile"); // Assuming '.tile' class for your tiles.
    tiles.forEach(function (tile) {
        tile.setAttribute("draggable", "true");
        tile.addEventListener("dragstart", function (event) {
            if (tile.getAttribute("draggable") === "true") {
                var DragEvent_1 = event;
                if (DragEvent_1.dataTransfer) {
                    DragEvent_1.dataTransfer.setData("text", tile.id); // Correctly access dataTransfer
                    if (!tile.parentElement) {
                        throw new Error("tile.parentElement does not exist");
                    }
                    else {
                        ///////////////////
                        var dropTargetId = tile.parentElement.id;
                        var onRow = parseInt(dropTargetId.substring(0, dropTargetId.indexOf(" ")));
                        var onColl = parseInt(dropTargetId.substring(dropTargetId.lastIndexOf(" ") + 1));
                        var gameBoardObjNow = gameBoard[onRow][onColl];
                        //////////////////A bunch of garbage code
                        //console.log("before", gameBoardObjNow);
                        if (turn % 2 === 0) {
                            (0, players_1.removeFromCurrentWord)(1, gameBoardObjNow);
                        }
                        else {
                            (0, players_1.removeFromCurrentWord)(2, gameBoardObjNow);
                        }
                        //console.log("after", gameBoardObjNow);
                        gameBoardObjNow.char = "";
                        gameBoardObjNow.special;
                        //console.log(gameBoard);
                    }
                }
            }
            else
                event.preventDefault();
        });
    });
}
exports.makeTilesDraggable = makeTilesDraggable;
/**
 * Creates tile elements for each letter in the provided string and appends them to the specified container element.
 *  Each tile is made draggable and is given a unique ID based on its position and the container it belongs to.
 *
 * @example
 * createTilesForLetters("leftTiles", "ABCDE"); // Creates draggable tiles for each letter and
 * appends them to the 'leftTiles' container.
 *
 * @param {string} containerId - The ID of the HTML element where the tiles will be appended.
 * @param {string} letters - A string of letters for which tiles will be created.
 * @returns {void}
 */
function createTilesForLetters(containerId, letters) {
    var container = document.getElementById(containerId);
    // Check if the container exists before proceeding.
    if (!container) {
        console.error("Container with ID ".concat(containerId, " not found."));
        return; // Exit the function early if container is null.
    }
    for (var i = 0; i < letters.length; i++) {
        var tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = "tile-".concat(containerId, "-").concat(i);
        tile.textContent = letters[i];
        tile.setAttribute("draggable", "true");
        container.appendChild(tile);
    }
}
/**
 * Configures the game board to allow players to take back tiles they've placed during the current turn
 * by right-clicking (context menu) on the tiles. Each tile placed on the board is tracked, and when a tile is
 * right-clicked, it checks if the tile was placed in the current turn. If so, the tile is moved back to the
 * player's hand (either left or right, depending on its origin), and the game board and player's tiles are
 * updated accordingly.
 *
 * This function iterates over each cell in the game board, attaching a 'contextmenu' event listener to prevent
 * the default context menu from appearing and to execute the take-back logic. The function ensures that only
 * tiles placed in the current turn can be taken back, maintaining game integrity and preventing manipulation
 * of tiles placed in previous turns.
 *
 * @example
 * setupTakeBackTile(); // Call this function after the game board is initialized and each time the board or the current turn's tiles are updated.
 *
 * Notes/Prerequisites:
 * - Assumes 'gameBoard' is a 2D array representing the board, where each cell contains tile information.
 * - Utilizes 'currentTurnPlacedTiles', an array tracking tiles placed during the current turn, including their positions and origins.
 * - Depends on 'leftLetters' and 'rightLetters' strings to manage the letters in each player's hand.
 * - Requires the 'refreshTiles' function to visually update the tiles in the players' hands on the UI.
 * - Uses 'cellElement.innerText' to clear the visual representation of a tile on the board when it is taken back.
 */
function setupTakeBackTile() {
    gameBoard.forEach(function (row, rowIndex) {
        row.forEach(function (cell, colIndex) {
            var cellElement = document.getElementById("".concat(rowIndex, " ").concat(colIndex));
            cellElement === null || cellElement === void 0 ? void 0 : cellElement.addEventListener("contextmenu", function () {
                var tileIndex = currentTurnPlacedTiles.findIndex(function (t) { return t.row === rowIndex && t.col === colIndex; });
                if (tileIndex !== -1) {
                    var tile = currentTurnPlacedTiles[tileIndex];
                    if (tile.origin === "left") {
                        leftLetters += tile.char;
                        (0, endTurn_1.refreshTiles)("leftTiles", leftLetters);
                    }
                    else if (tile.origin === "right") {
                        rightLetters += tile.char;
                        (0, endTurn_1.refreshTiles)("rightTiles", rightLetters);
                    }
                    gameBoard[rowIndex][colIndex].char = "";
                    cellElement.innerText = "";
                    currentTurnPlacedTiles.splice(tileIndex, 1);
                }
            });
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var boardElement = document.getElementById("board");
    if (boardElement) {
        createBoard(boardElement, 15, 15, gameBoard);
    }
    for (var i = 0; i < 7; i++) {
        leftLetters += q.head(letterQueue);
        q.dequeue(letterQueue);
        rightLetters += q.head(letterQueue);
        q.dequeue(letterQueue);
    }
    createTilesForLetters("leftTiles", leftLetters);
    createTilesForLetters("rightTiles", rightLetters);
    // Make sure to call this after creating the tiles
    makeTilesDraggable();
    setupTakeBackTile();
});
if (submitButton) {
    submitButton.addEventListener("click", function () {
        console.log(gameBoard);
        if ((0, spellChecker_1.checkWordsOnBoard)(gameBoard, library) &&
            gameBoard[7][7].char !== "" &&
            (0, dfs_1.countConnectedLetters)(gameBoard, 7, 7) === (0, dfs_1.countPlacedSquares)(gameBoard)) {
            var tiles = document.querySelectorAll(".tile");
            tiles.forEach(function (tile) {
                tile.className = "notMovableEnyMore";
                tile.setAttribute("draggable", "false");
            });
            turn++;
            var leftTiles = document.getElementById("leftTiles");
            var rightTiles = document.getElementById("rightTiles");
            if (turn % 2 === 0) {
                //Odd turns are player 2 even are player 1
                //Add score to player2
                if (players_1.player2.currentWords.length !== 0) {
                    (0, players_1.addPlayerScore)(2, roundScore);
                }
                var player2_score = document.getElementById("player2Score");
                if (player2_score)
                    player2_score.innerText = "Score: ".concat((0, players_1.getPlayerScore)(2));
                //remove current words from player1
                (0, players_1.resetCurrentWord)();
                // Hide right tiles, show left tiles
                if (rightTiles)
                    rightTiles.style.display = "none";
                if (leftTiles)
                    leftTiles.style.display = "block";
                // Replenish leftLetters if needed and refresh UI
                while (leftLetters.length < 7 && !q.is_empty(letterQueue)) {
                    leftLetters += q.head(letterQueue);
                    q.dequeue(letterQueue);
                }
                (0, endTurn_1.refreshTiles)("leftTiles", leftLetters);
            }
            else {
                //Add score to player1
                if (players_1.player1.currentWords.length !== 0) {
                    (0, players_1.addPlayerScore)(1, roundScore);
                }
                var player1_score = document.getElementById("player1Score");
                if (player1_score)
                    player1_score.innerText = "Score: ".concat((0, players_1.getPlayerScore)(1));
                //remove current words from player1
                (0, players_1.resetCurrentWord)();
                // Hide left tiles, show right tiles
                if (leftTiles)
                    leftTiles.style.display = "none";
                if (rightTiles)
                    rightTiles.style.display = "block";
                // Replenish rightLetters if needed and refresh UI
                while (rightLetters.length < 7 && !q.is_empty(letterQueue)) {
                    rightLetters += q.head(letterQueue);
                    q.dequeue(letterQueue);
                }
                (0, endTurn_1.refreshTiles)("rightTiles", rightLetters);
                currentTurnPlacedTiles = [];
            }
        }
    });
}
if (changeLettersButton) {
    changeLettersButton.addEventListener("click", function () {
        if (turn % 2 === 0) {
            while (leftLetters.length !== 0) {
                // Enqueue the last letter of leftLetters into the letterQueue
                q.enqueue(leftLetters.substring(leftLetters.length - 1), letterQueue);
                // Remove the last letter from leftLetters
                leftLetters = leftLetters.substring(0, leftLetters.length - 1);
            }
            (0, endTurn_1.refreshTiles)("leftTiles", leftLetters);
        }
        else {
            while (rightLetters.length !== 0) {
                // Enqueue the last letter of rightLetters into the letterQueue
                q.enqueue(rightLetters.substring(rightLetters.length - 1), letterQueue);
                // Remove the last letter from rightLetters
                rightLetters = rightLetters.substring(0, rightLetters.length - 1);
            }
            (0, endTurn_1.refreshTiles)("rightTiles", rightLetters);
        }
    });
}
var startButton = document.getElementById("startButton");
var loginButton = document.getElementById("loginButton1");
var loginButton2 = document.getElementById("loginButton2");
var createUserButton = document.getElementById("createUser");
var loginContainer = document.getElementById("login-container");
var outerDiv = document.getElementById("outerDiv");
if (startButton !== null) {
    startButton.addEventListener("click", function () {
        if (loginContainer)
            loginContainer.style.display = "none";
        if (outerDiv)
            outerDiv.style.display = "block";
    });
}
if (loginButton !== null) {
    loginButton.addEventListener("click", login_1.validateLogin);
}
if (loginButton2) {
    loginButton2.addEventListener("click", login_1.validateLogin2);
}
if (createUserButton) {
    createUserButton.addEventListener("click", login_1.validateUserCreation);
}
