"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var q = require("./lib/queue_array");
var randomLetters_1 = require("./lib/randomLetters");
var gameBoard_1 = require("./lib/gameBoard");
var gameBoard = [];
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
        (0, gameBoard_1.createBoard)(boardElement, 15, 15, gameBoard); // Your existing board creation logic
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
