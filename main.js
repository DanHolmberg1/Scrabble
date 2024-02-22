"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var q = require("./lib/queue_array");
var randomLetters_1 = require("./lib/randomLetters");
var spellChecker_1 = require("./lib/spellChecker");
var gameBoard = [];
var library = [];
//Gets the words from our wordlist.
fetch('lib/Collins Scrabble Words (2019).txt')
    .then(function (response) { return response.text(); })
    .then(function (text) {
    library = text.split('\n');
})
    .catch(function (error) { return console.error('Error loading the text file:', error); });
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
                var _a;
                ////This checks when tile is dropped on cell
                event.preventDefault();
                if (!event.dataTransfer) {
                    throw new Error("event.dataTransfer does not exist");
                }
                var draggableId = event.dataTransfer.getData("text");
                //console.log(draggableId);
                var draggable = document.getElementById(draggableId);
                //console.log(draggable);
                //console.log(event);
                var dropTargetId = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
                var onRow = parseInt(dropTargetId.substring(0, dropTargetId.indexOf(" ")));
                var onColl = parseInt(dropTargetId.substring(dropTargetId.lastIndexOf(" ") + 1));
                //console.log(onRow);
                //console.log(onColl);
                var gameBoardObjNow = gameBoard[onRow][onColl];
                //console.log(gameBoardObjNow);
                if (draggable && cell && cell.childElementCount == 0) {
                    gameBoardObjNow.char = draggable.innerText;
                    if (gameBoardObjNow.special !== 0) {
                        cell.innerText = "";
                    }
                    console.log(gameBoard);
                    console.log("after");
                    console.log("spellchecking", (0, spellChecker_1.checkWordsOnBoard)(gameBoard, library));
                    cell.appendChild(draggable);
                    cell.classList.remove("over"); // Cleanup visual cue.
                }
            });
            cell.addEventListener("dragleave", function () {
                cell.classList.remove("over"); // Cleanup visual cue.
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
                    gameBoardObjNow.char = "";
                    gameBoardObjNow.special;
                    //console.log(gameBoard);
                }
            }
        });
    });
}
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
    var letterQueue = (0, randomLetters_1.generateRandomLetters)();
    var leftLetters = "";
    var rightLetters = "";
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
