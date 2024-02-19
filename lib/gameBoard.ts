export type cell<A, B> = { row: A; col: A; special: A; char: B };


let gameBoard: Array<Array<Array<cell<number, string>>>> = [];

export function createBoard(
  boardElement: HTMLElement,
  rows: number,
  cols: number
): void {
  for (let row = 0; row < rows; row++) {
    gameBoard.push([]);

    for (let col = 0; col < cols; col++) {
      gameBoard[row].push([{ row: row, col: col, special: 0, char: "" }]);

      const cell = document.createElement("div");
      const id: string = String(row + " " + col);
      cell.classList.add("cell");

      cell.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allows us to drop.
        cell.classList.add("over"); // Optional: Visual cue.
      });

      cell.addEventListener("drop", (event) => {
        ////This checks when tile is dropped on cell
        event.preventDefault();
        if (!event.dataTransfer) {
          throw new Error("event.dataTransfer does not exist");
        }
        const draggableId = event.dataTransfer.getData("text");
        console.log(draggableId);
        const draggable = document.getElementById(draggableId);
        console.log(draggable);
        console.log(event);
        if (draggable && cell) {
          cell.appendChild(draggable);
          cell.classList.remove("over"); // Cleanup visual cue.
        }
      });

      cell.addEventListener("dragleave", () => {
        cell.classList.remove("over"); // Cleanup visual cue.
      });

      if (speicalSquares[row][col] === 0) {
        boardElement.appendChild(cell);
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 1) {
        cell.textContent = "DL";
        cell.setAttribute("data-special", "double-letter");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 2) {
        cell.textContent = "TL";
        cell.setAttribute("data-special", "triple-letter");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 3) {
        cell.textContent = "DW";
        cell.setAttribute("data-special", "double-word");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 4) {
        cell.textContent = "TW";
        cell.setAttribute("data-special", "triple-word");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 5) {
        cell.textContent = "S";
        cell.setAttribute("data-special", "starting-square");
        cell.setAttribute("id", id);
      }

      boardElement.appendChild(cell);
    }
  }
}


const speicalSquares: number[][] = [
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
  
