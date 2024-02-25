import * as q from "./lib/queue_array";
import { generateRandomLetters } from "./lib/randomLetters";
import { checkWordsOnBoard } from "./lib/spellChecker";
import { isTilePlaced, refreshTiles } from "./endTurn";
import { getPoints } from "./lib/pointCounter";
import {
  Player,
  player1,
  player2,
  addToCurrentWord,
  removeFromCurrentWord,
  resetCurrentWord,
  addPlayerScore,
  getPlayerScore,
} from "./lib/players";

export type cell<A, B> = { row: A; col: A; special: A; char: B };

const submitButton = document.getElementById("submitButton");

const passButton = document.getElementById("pass");

let gameBoard: Array<Array<cell<number, string>>> = [];

let roundScore: number = 0;

let turn: number = 0;

let library: string[] = [];

let leftLetters: string = "";

let rightLetters: string = "";

let letterQueue: q.Queue<string> = generateRandomLetters();

//Gets the words from our wordlist.

fetch("lib/Collins Scrabble Words (2019).txt")
  .then((response) => response.text())
  .then((data) => {
    // Split the data into an array using line breaks
    const dataArray = data.split("\n");
    const cleanedArray = dataArray.map((row) => row.replace(/\r/g, ""));
    library = cleanedArray;
  })
  .catch((error) => console.error("Error reading the file:", error));

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
        event.preventDefault();
        if (!event.dataTransfer) {
          throw new Error("event.dataTransfer does not exist");
        }
        const draggableId = event.dataTransfer.getData("text");
        const draggable = document.getElementById(draggableId);
        const dropTargetId: string | null = (event.target as HTMLElement)?.id;

        if (draggable && cell && cell.childElementCount == 0) {
          const tileCharacter = draggable.innerText;
          const draggableParentId = draggable.parentElement?.id;

          // Identify source container and remove character from the corresponding array
          if (draggableParentId && draggableParentId.includes("leftTiles")) {
            leftLetters = leftLetters
              .split("")
              .filter((c) => c !== tileCharacter)
              .join("");
          } else if (
            draggableParentId &&
            draggableParentId.includes("rightTiles")
          ) {
            rightLetters = rightLetters
              .split("")
              .filter((c) => c !== tileCharacter)
              .join("");
          }

          // Existing logic for handling a successful drop
          const onRow = parseInt(
            dropTargetId.substring(0, dropTargetId.indexOf(" "))
          );

          const onColl = parseInt(
            dropTargetId.substring(dropTargetId.lastIndexOf(" ") + 1)
          );
          const gameBoardObjNow = gameBoard[onRow][onColl];
          gameBoardObjNow.char = tileCharacter;
          if (gameBoardObjNow.special !== 0) {
            cell.innerText = "";
          }

          if (turn % 2 === 0) {
            addToCurrentWord(1, gameBoardObjNow);
            roundScore = getPoints(gameBoard, player1);
            const player1_score = document.getElementById("player1Score");
            if (player1_score)
              player1_score.innerText = `Score: ${
                getPlayerScore(1) + roundScore
              }`;
          } else {
            addToCurrentWord(2, gameBoardObjNow);
            roundScore = getPoints(gameBoard, player2);

            const player2_score = document.getElementById("player2Score");
            if (player2_score)
              player2_score.innerText = `Score: ${
                getPlayerScore(2) + roundScore
              }`;
          }

          console.log(player1.currentWords);
          ///console.log(gameBoard);
          //console.log("after");
          //console.log("spellchecking", checkWordsOnBoard(gameBoard, library));
          cell.appendChild(draggable);
          cell.classList.remove("over"); // Cleanup visual cue.
        }
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

export function makeTilesDraggable(): void {
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
          console.log("before", gameBoardObjNow);
          if (turn % 2 === 0) {
            removeFromCurrentWord(1, gameBoardObjNow);
          } else {
            removeFromCurrentWord(2, gameBoardObjNow);
          }
          console.log("after", gameBoardObjNow);
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

if (submitButton) {
  submitButton.addEventListener("click", () => {
    if (checkWordsOnBoard(gameBoard, library)) {
      turn++;
      // Logic to display the correct set of tiles and replenish letters
      const leftTiles = document.getElementById("leftTiles");
      const rightTiles = document.getElementById("rightTiles");

      if (turn % 2 === 0) {
        //Add score to player2
        addPlayerScore(2, roundScore);
        const player2_score = document.getElementById("player2Score");
        if (player2_score)
          player2_score.innerText = `Score: ${getPlayerScore(2)}`;
        //remove current words from player1
        resetCurrentWord();
        // Hide right tiles, show left tiles
        if (rightTiles) rightTiles.style.display = "none";
        if (leftTiles) leftTiles.style.display = "block";

        // Replenish leftLetters if needed and refresh UI
        while (leftLetters.length < 7 && !q.is_empty(letterQueue)) {
          leftLetters += q.head(letterQueue);
          q.dequeue(letterQueue);
        }
        refreshTiles("leftTiles", leftLetters);
      } else {
        //Add score to player1
        addPlayerScore(1, roundScore);
        const player1_score = document.getElementById("player1Score");
        if (player1_score)
          player1_score.innerText = `Score: ${getPlayerScore(1)}`;
        //remove current words from player1
        resetCurrentWord();
        // Hide left tiles, show right tiles
        if (leftTiles) leftTiles.style.display = "none";
        if (rightTiles) rightTiles.style.display = "block";

        // Replenish rightLetters if needed and refresh UI
        while (rightLetters.length < 7 && !q.is_empty(letterQueue)) {
          rightLetters += q.head(letterQueue);
          q.dequeue(letterQueue);
        }
        refreshTiles("rightTiles", rightLetters);
      }
    }
  });
}

if (passButton) {
  passButton.addEventListener("click", () => {
    turn++;
  });
}
