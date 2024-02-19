"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = void 0;
function createBoard(boardElement, rows, cols, board) {
    for (var row = 0; row < rows; row++) {
        board.push([]);
        var _loop_1 = function (col) {
            board[row].push([{ row: row, col: col, special: 0, char: "" }]);
            var cell = document.createElement("div");
            var id = String(row + " " + col);
            cell.classList.add("cell");
            cell.addEventListener("dragover", function (event) {
                event.preventDefault(); // Allows us to drop.
                cell.classList.add("over"); // Optional: Visual cue.
            });
            cell.addEventListener("drop", function (event) {
                ////This checks when tile is dropped on cell
                event.preventDefault();
                if (!event.dataTransfer) {
                    throw new Error("event.dataTransfer does not exist");
                }
                var draggableId = event.dataTransfer.getData("text");
                console.log(draggableId);
                var draggable = document.getElementById(draggableId);
                console.log(draggable);
                console.log(event);
                if (draggable && cell && cell.childElementCount == 0) {
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
exports.createBoard = createBoard;
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
