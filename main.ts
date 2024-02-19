import * as q from './lib/queue_array';
import {generateRandomLetters} from './lib/randomLetters';
import { createBoard, type cell } from './lib/gameBoard';

function makeTilesDraggable(): void {
  // Query all your draggable tiles by a common class or other selector.
  const tiles = document.querySelectorAll(".tile"); // Assuming '.tile' class for your tiles.
  tiles.forEach((tile) => {
    tile.setAttribute("draggable", "true");

    tile.addEventListener("dragstart", (event) => {
      const DragEvent = event as DragEvent;

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
    createBoard(boardElement, 15, 15); // Your existing board creation logic
  }

  let letterQueue: q.Queue<string> = generateRandomLetters();
  let leftLetters: string = "";
  let rightLetters: string = "";

  for (let i = 0; i < 7; i++) {
    leftLetters += q.head(letterQueue)
    q.dequeue(letterQueue);
    rightLetters += q.head(letterQueue);
    q.dequeue(letterQueue);
  }
  createTilesForLetters("leftTiles", leftLetters);
  createTilesForLetters("rightTiles", rightLetters);

  // Make sure to call this after creating the tiles
  makeTilesDraggable();
});
