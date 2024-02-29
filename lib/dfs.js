"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countPlacedSquares = exports.countConnectedLetters = void 0;
function countConnectedLetters(gameBoard, startRow, startCol) {
    if (startRow < 0 ||
        startCol < 0 ||
        startRow >= gameBoard.length ||
        startCol >= gameBoard[startRow].length ||
        gameBoard[startRow][startCol].char === "") {
        return 0;
    }
    var originalChar = gameBoard[startRow][startCol].char;
    gameBoard[startRow][startCol].char = "";
    var count = 1;
    var directions = [
        [-1, 0], // Up
        [0, 1], // Right
        [1, 0], // Down
        [0, -1], // Left
    ];
    // Explore adjacent cells
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var _a = directions_1[_i], dRow = _a[0], dCol = _a[1];
        var newRow = startRow + dRow;
        var newCol = startCol + dCol;
        count += countConnectedLetters(gameBoard, newRow, newCol);
    }
    gameBoard[startRow][startCol].char = originalChar;
    return count;
}
exports.countConnectedLetters = countConnectedLetters;
function countPlacedSquares(gameBoard) {
    var count = 0;
    for (var row = 0; row < gameBoard.length; row++) {
        for (var col = 0; col < gameBoard[row].length; col++) {
            if (gameBoard[row][col].char !== "") {
                count++;
            }
        }
    }
    return count;
}
exports.countPlacedSquares = countPlacedSquares;
