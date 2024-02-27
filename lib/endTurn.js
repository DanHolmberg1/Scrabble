"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTiles = exports.isTilePlaced = void 0;
var main_1 = require("../main");
function isTilePlaced(cellElement) {
    return cellElement.childElementCount > 0;
}
exports.isTilePlaced = isTilePlaced;
function refreshTiles(containerId, letters) {
    var container = document.getElementById(containerId);
    if (!container)
        return;
    container.innerHTML = ''; // Clear existing tiles
    for (var i = 0; i < letters.length; i++) { // Re-create tiles
        var tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = "tile-".concat(containerId, "-").concat(i);
        tile.textContent = letters[i];
        container.appendChild(tile);
    }
    (0, main_1.makeTilesDraggable)(); // Make new tiles draggable
}
exports.refreshTiles = refreshTiles;
