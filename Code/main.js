"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var q = require("../lib/queue_array");
function createBoard(boardElement, rows, cols) {
    for (var row = 0; row < rows; row++) {
        var _loop_1 = function (col) {
            var cell = document.createElement("div");
            var id = String(row + "" + col);
            cell.classList.add("cell");
            cell.addEventListener("dragover", function (event) {
                event.preventDefault(); // Allows us to drop.
                cell.classList.add("over"); // Optional: Visual cue.
            });
            cell.addEventListener("drop", function (event) {
                event.preventDefault();
                if (!event.dataTransfer) {
                    throw new Error("event.dataTransfer does not exist");
                }
                var draggableId = event.dataTransfer.getData("text");
                var draggable = document.getElementById(draggableId);
                if (draggable && cell) {
                    cell.appendChild(draggable);
                    cell.classList.remove("over"); // Cleanup visual cue.
                }
            });
            cell.addEventListener("dragleave", function () {
                cell.classList.remove("over"); // Cleanup visual cue.
            });
            if (speicalSquares[row][col] === 0) {
                boardElement.appendChild(cell);
                cell.setAttribute("id", id);
                return "continue";
            }
            else if (speicalSquares[row][col] === 1) {
                cell.textContent = "DL";
                cell.setAttribute("data-special", "double-letter");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 2) {
                cell.textContent = "TL";
                cell.setAttribute("data-special", "triple-letter");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 3) {
                cell.textContent = "DW";
                cell.setAttribute("data-special", "double-word");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 4) {
                cell.textContent = "TW";
                cell.setAttribute("data-special", "triple-word");
                cell.setAttribute("id", id);
            }
            else if (speicalSquares[row][col] === 5) {
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
function makeTilesDraggable() {
    // Query all your draggable tiles by a common class or other selector.
    var tiles = document.querySelectorAll(".tile"); // Assuming '.tile' class for your tiles.
    tiles.forEach(function (tile) {
        tile.setAttribute("draggable", "true");
        tile.addEventListener("dragstart", function (event) {
            var DragEvent = event;
            if (DragEvent.dataTransfer) {
                DragEvent.dataTransfer.setData("text", tile.id); // Correctly access dataTransfer
            }
        });
    });
}
/*
  0 = normal square
  1 = Double Letter
  2 = Triple letter
  3 = Double Word
  4 = Triple Word
  5 = Start square
  */
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
function generateRandomLetters() {
    var letters = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'D', 'D', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'F', 'F',
        'G', 'G', 'G', 'H', 'H', 'I', 'I', 'I', 'I', 'I', 'J', 'K', 'K', 'K', 'L', 'L', 'L', 'L', 'L', 'M', 'M', 'M', 'N', 'N', 'N',
        'N', 'N', 'O', 'O', 'O', 'O', 'O', 'P', 'P', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'S', 'S', 'S',
        'S', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'U', 'U', 'U', 'V', 'V', 'X', 'Y', 'Z', 'Å', 'Å', 'Ä', 'Ä', 'Ö', 'Ö'];
    var randomLetters = q.empty();
    var lettersScrambled = shuffle(letters);
    for (var i = 0; i < lettersScrambled.length; i++) {
        q.enqueue(lettersScrambled[i], randomLetters);
    }
    return randomLetters;
}
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
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function createTilesForLetters(containerId, letters) {
    var container = document.getElementById(containerId);
    // Check if the container exists before proceeding.
    if (!container) {
        console.error("Container with ID ".concat(containerId, " not found."));
        return; // Exit the function early if container is null.
    }
    letters.forEach(function (letter, index) {
        var tile = document.createElement("div");
        tile.textContent = letter;
        tile.id = "tile-".concat(containerId, "-").concat(index); // Unique ID for each tile
        tile.classList.add("tile"); // Use this class for styling and drag event binding
        tile.setAttribute("draggable", "true");
        container.appendChild(tile); // Append the tile to the container
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var boardElement = document.getElementById("board");
    if (boardElement) {
        createBoard(boardElement, 15, 15); // Your existing board creation logic
    }
    // Gör om för att funka med queues.
    //const leftLetters = generateRandomLetters(7);
    //const rightLetters = generateRandomLetters(7);
    //createTilesForLetters("leftTiles", leftLetters);
    //createTilesForLetters("rightTiles", rightLetters);
    // Make sure to call this after creating the tiles
    makeTilesDraggable();
});
