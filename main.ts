function createBoard(
  boardElement: HTMLElement,
  rows: number,
  cols: number
): void {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      const id: string = String(row + "" + col);
      cell.classList.add("cell");

      cell.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allows us to drop.
        cell.classList.add("over"); // Optional: Visual cue.
      });

      cell.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!event.dataTransfer) {
          throw new Error("event.dataTransfer does not exist");
        }
        const draggableId = event.dataTransfer.getData("text");
        const draggable = document.getElementById(draggableId);

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
        continue;
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

function generateRandomLetters(count: number): string[] {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomLetters = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomLetters.push(letters[randomIndex]);
  }
  return randomLetters;
}

function createTilesForLetters(containerId: string, letters: string[]): void {
  const container = document.getElementById(containerId);

  // Check if the container exists before proceeding.
  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return; // Exit the function early if container is null.
  }

  letters.forEach((letter, index) => {
    const tile = document.createElement("div");
    tile.textContent = letter;
    tile.id = `tile-${containerId}-${index}`; // Unique ID for each tile
    tile.classList.add("tile"); // Use this class for styling and drag event binding
    tile.setAttribute("draggable", "true");
    container.appendChild(tile); // Append the tile to the container
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");
  if (boardElement) {
    createBoard(boardElement, 15, 15); // Your existing board creation logic
  }

  const leftLetters = generateRandomLetters(7);
  const rightLetters = generateRandomLetters(7);

  createTilesForLetters("leftTiles", leftLetters);
  createTilesForLetters("rightTiles", rightLetters);

  // Make sure to call this after creating the tiles
  makeTilesDraggable();
});
