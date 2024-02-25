"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTilesDraggable = void 0;
var q = require("./lib/queue_array");
var randomLetters_1 = require("./lib/randomLetters");
var spellChecker_1 = require("./lib/spellChecker");
var endTurn_1 = require("./endTurn");
var pointCounter_1 = require("./lib/pointCounter");
var players_1 = require("./lib/players");
var submitButton = document.getElementById("submitButton");
var passButton = document.getElementById("pass");
var gameBoard = [];
var roundScore = 0;
var turn = 0;
var library = [];
var leftLetters = "";
var rightLetters = "";
var letterQueue = (0, randomLetters_1.generateRandomLetters)();
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
                    // Identify source container and remove character from the corresponding array
                    if (draggableParentId && draggableParentId.includes("leftTiles")) {
                        leftLetters = leftLetters
                            .split("")
                            .filter(function (c) { return c !== tileCharacter_1; })
                            .join("");
                    }
                    else if (draggableParentId &&
                        draggableParentId.includes("rightTiles")) {
                        rightLetters = rightLetters
                            .split("")
                            .filter(function (c) { return c !== tileCharacter_1; })
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
                    console.log(players_1.player1.currentWords);
                    ///console.log(gameBoard);
                    //console.log("after");
                    //console.log("spellchecking", checkWordsOnBoard(gameBoard, library));
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
                cell.textContent = "DL";
                cell.setAttribute("data-special", "double-letter");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 2) {
                board[row][col].special = 2;
                cell.textContent = "TL";
                cell.setAttribute("data-special", "triple-letter");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 3) {
                board[row][col].special = 3;
                cell.textContent = "DW";
                cell.setAttribute("data-special", "double-word");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 4) {
                board[row][col].special = 4;
                cell.textContent = "TW";
                cell.setAttribute("data-special", "triple-word");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 5) {
                board[row][col].special = 5;
                cell.textContent = "S";
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
    [1, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 3, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [4, 0, 0, 0, 3, 0, 1, 0, 1, 0, 3, 0, 0, 0, 4],
    [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0],
    [0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [2, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 2],
];
function makeTilesDraggable() {
    // Query all your draggable tiles by a common class or other selector.
    var tiles = document.querySelectorAll(".tile"); // Assuming '.tile' class for your tiles.
    tiles.forEach(function (tile) {
        tile.setAttribute("draggable", "true");
        tile.addEventListener("dragstart", function (event) {
            var DragEvent = event;
            if (DragEvent.dataTransfer) {
                DragEvent.dataTransfer.setData("text", tile.id); // Correctly access dataTransfer
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
                    console.log("before", gameBoardObjNow);
                    if (turn % 2 === 0) {
                        (0, players_1.removeFromCurrentWord)(1, gameBoardObjNow);
                    }
                    else {
                        (0, players_1.removeFromCurrentWord)(2, gameBoardObjNow);
                    }
                    console.log("after", gameBoardObjNow);
                    gameBoardObjNow.char = "";
                    gameBoardObjNow.special;
                    //console.log(gameBoard);
                }
            }
        });
    });
}
exports.makeTilesDraggable = makeTilesDraggable;
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
document.addEventListener("DOMContentLoaded", function () {
    var boardElement = document.getElementById("board");
    if (boardElement) {
        createBoard(boardElement, 15, 15, gameBoard); // Your existing board creation logic
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
});
if (submitButton) {
    submitButton.addEventListener("click", function () {
        if ((0, spellChecker_1.checkWordsOnBoard)(gameBoard, library)) {
            turn++;
            // Logic to display the correct set of tiles and replenish letters
            var leftTiles = document.getElementById("leftTiles");
            var rightTiles = document.getElementById("rightTiles");
            if (turn % 2 === 0) {
                //Add score to player2
                (0, players_1.addPlayerScore)(2, roundScore);
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
                (0, players_1.addPlayerScore)(1, roundScore);
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
            }
        }
    });
}
if (passButton) {
    passButton.addEventListener("click", function () {
        turn++;
    });
}
