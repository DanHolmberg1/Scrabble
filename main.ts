import * as q from "./lib/queue_array";
import { generateRandomLetters } from "./lib/randomLetters";
import { checkWordsOnBoard } from "./lib/spellChecker";

let gameBoard: Array<Array<cell<number, string>>> = [];

export type cell<A, B> = { row: A; col: A; special: A; char: B };
let library: string[] = [];

fetch('lib/Collins Scrabble Words (2019).txt')
    .then(response => response.text())
    .then(text => {
      library = text.split('\n');
    })
    .catch(error => console.error('Error loading the text file:', error));




function createBoard(
  boardElement: HTMLElement,
  rows: number,
  cols: number,
  board: cell<number, string>[][]
): void {
  for (let row = 0; row < rows; row++) {
    board.push([]);

    for (let col = 0; col < cols; col++) {
      board[row].push({ row: row, col: col, special: 0, char: "" });

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
        //console.log(draggableId);
        const draggable = document.getElementById(draggableId);
        //console.log(draggable);
        //console.log(event);
        const dropTargetId: string | null = (event.target as HTMLElement)?.id;

        const onRow = parseInt(
          dropTargetId.substring(0, dropTargetId.indexOf(" "))
        );
        const onColl = parseInt(
          dropTargetId.substring(dropTargetId.lastIndexOf(" ") + 1)
        );
        //console.log(onRow);
        //console.log(onColl);
        const gameBoardObjNow = gameBoard[onRow][onColl];
        //console.log(gameBoardObjNow);
        if (draggable && cell && cell.childElementCount == 0) {
          gameBoardObjNow.char = draggable.innerText;
          if (gameBoardObjNow.special !== 0) {
            cell.innerText = "";
          }

          console.log(gameBoard);
          console.log("after");
          console.log("spellchecking", checkWordsOnBoard(gameBoard, library));
          cell.appendChild(draggable);
          cell.classList.remove("over"); // Cleanup visual cue.
        }
      });

      cell.addEventListener("dragleave", () => {
        cell.classList.remove("over"); // Cleanup visual cue.
      });

      if (speicalSquares[row][col] === 0) {
        board[row][col].special = 0;
        boardElement.appendChild(cell);
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 1) {
        board[row][col].special = 1;
        cell.textContent = "DL";
        cell.setAttribute("data-special", "double-letter");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 2) {
        board[row][col].special = 2;
        cell.textContent = "TL";
        cell.setAttribute("data-special", "triple-letter");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 3) {
        board[row][col].special = 3;
        cell.textContent = "DW";
        cell.setAttribute("data-special", "double-word");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 4) {
        board[row][col].special = 4;
        cell.textContent = "TW";
        cell.setAttribute("data-special", "triple-word");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 5) {
        board[row][col].special = 5;
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

function makeTilesDraggable(): void {
  // Query all your draggable tiles by a common class or other selector.
  const tiles = document.querySelectorAll(".tile"); // Assuming '.tile' class for your tiles.
  tiles.forEach((tile) => {
    tile.setAttribute("draggable", "true");

    tile.addEventListener("dragstart", (event) => {
      const DragEvent = event as DragEvent;

      if (DragEvent.dataTransfer) {
        DragEvent.dataTransfer.setData("text", tile.id); // Correctly access dataTransfer
        if (!tile.parentElement) {
          throw new Error("tile.parentElement does not exist");
        } else {
          ///////////////////
          const dropTargetId: string | null = tile.parentElement.id;
          const onRow = parseInt(
            dropTargetId.substring(0, dropTargetId.indexOf(" "))
          );
          const onColl = parseInt(
            dropTargetId.substring(dropTargetId.lastIndexOf(" ") + 1)
          );
          const gameBoardObjNow = gameBoard[onRow][onColl];
          //////////////////A bunch of garbage code

          gameBoardObjNow.char = "";
          gameBoardObjNow.special;
          //console.log(gameBoard);
        }
      }
    });
  });
}

function createTilesForLetters(containerId: string, letters: string): void {
  const container = document.getElementById(containerId);

  // Check if the container exists before proceeding.
  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return; // Exit the function early if container is null.
  }
  for (let i = 0; i < letters.length; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = `tile-${containerId}-${i}`;
    tile.textContent = letters[i];
    tile.setAttribute("draggable", "true");
    container.appendChild(tile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");
  if (boardElement) {
    createBoard(boardElement, 15, 15, gameBoard); // Your existing board creation logic
  }

  let letterQueue: q.Queue<string> = generateRandomLetters();
  let leftLetters: string = "";
  let rightLetters: string = "";

  for (let i = 0; i < 7; i++) {
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
