import * as q from "./lib/queue_array";
import { generateRandomLetters } from "./lib/randomLetters";
import { checkWordsOnBoard } from "./lib/spellChecker";
import { isTilePlaced, refreshTiles } from "./lib/endTurn";
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
import { countConnectedLetters, countPlacedSquares } from "./lib/dfs";
import { validateLogin, validateLogin2, validateUserCreation } from "./login";

export type cell<A, B> = { row: A; col: A; special: A; char: B };

const submitButton = document.getElementById("submitButton");

const changeLettersButton = document.getElementById("newLetters");

const takeBackTiles = document.getElementById("takeBackLetters");

let gameBoard: Array<Array<cell<number, string>>> = [];

let roundScore: number = 0;

let turn: number = 0;

let library: string[] = [];

let leftLetters: string = "";

let rightLetters: string = "";

let letterQueue: q.Queue<string> = generateRandomLetters();

let currentTurnPlacedTiles: Array<{
  row: number;
  col: number;
  char: string;
  origin: "left" | "right";
}> = [];

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

/**
 * Initializes and displays the game board on the specified HTML element, creating cells based on the given rows and columns. Each cell is represented by a `cell` object and can have special attributes like double letter score, triple letter score, etc., which are visually indicated on the board.
 *
 * @example
 * const boardElement = document.getElementById("board");
 * createBoard(boardElement, 15, 15, gameBoard); // Initializes a 15x15 game board.
 *
 * @param {HTMLElement} boardElement - The HTML element where the board will be displayed.
 * @param {number} rows - The number of rows in the game board.
 * @param {number} cols - The number of columns in the game board.
 * @param {cell<number, string>[][]} board - The game board data structure to be filled with cell objects.
 * @returns {void}
 */
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

          // Identify side/player container and remove character from the corresponding array
          if (draggableParentId && draggableParentId.includes("leftTiles")) {
            let found = false; // Flag to indicate removal
            leftLetters = leftLetters
              .split("")
              .filter((c) => {
                if (!found && c === tileCharacter) {
                  found = true; // Mark that we found and are removing the character
                  return false; // Remove this character
                }
                return true; // Keep all other characters
              })
              .join("");
          } else if (
            draggableParentId &&
            draggableParentId.includes("rightTiles")
          ) {
            let found = false; // Flag to indicate removal
            rightLetters = rightLetters
              .split("")
              .filter((c) => {
                if (!found && c === tileCharacter) {
                  found = true; // Mark that we found and are removing the character
                  return false; // Remove this character
                }
                return true; // Keep all other characters
              })
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

          //console.log(player1.currentWords);
          ///console.log(gameBoard);
          //console.log("after");
          //console.log("spellchecking", checkWordsOnBoard(gameBoard, library));
          currentTurnPlacedTiles.push({
            row: onRow, // Assuming these are defined in your drop logic
            col: onColl,
            char: tileCharacter, // The character of the tile placed
            origin: draggableParentId?.includes("leftTiles") ? "left" : "right", // Determine the origin based on draggableParentId
          });
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
        cell.setAttribute("data-special", "double-letter");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 2) {
        board[row][col].special = 2;
        cell.setAttribute("data-special", "triple-letter");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 3) {
        board[row][col].special = 3;
        cell.setAttribute("data-special", "double-word");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === 4) {
        board[row][col].special = 4;
        cell.setAttribute("data-special", "triple-word");
        cell.setAttribute("id", id);
      } else if (speicalSquares[row][col] === -1) {
        board[row][col].special = -1;
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
  [1, 0, 0, 3, 0, 0, 0, -1, 0, 0, 0, 3, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
  [4, 0, 0, 0, 3, 0, 1, 0, 1, 0, 3, 0, 0, 0, 4],
  [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0],
  [0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0],
  [2, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 2],
];

/**
 * Makes each tile within the game draggable. It sets up drag event listeners on tiles so that they
 * can be moved to different parts of the game board. This function should be called after the tiles
 * are created and rendered on the page.
 *
 * @example
 * makeTilesDraggable(); // Initializes drag functionality for all tiles with the '.tile' class.
 *
 * @returns {void}
 */
export function makeTilesDraggable(): void {
  // Query all your draggable tiles by a common class or other selector.
  const tiles = document.querySelectorAll(".tile"); // Assuming '.tile' class for your tiles.

  tiles.forEach((tile) => {
    tile.setAttribute("draggable", "true");

    tile.addEventListener("dragstart", (event) => {
      if (tile.getAttribute("draggable") === "true") {
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
            //console.log("before", gameBoardObjNow);
            if (turn % 2 === 0) {
              removeFromCurrentWord(1, gameBoardObjNow);
            } else {
              removeFromCurrentWord(2, gameBoardObjNow);
            }
            //console.log("after", gameBoardObjNow);
            gameBoardObjNow.char = "";
            gameBoardObjNow.special;

            //console.log(gameBoard);
          }
        }
      } else event.preventDefault();
    });
  });
}

/**
 * Creates tile elements for each letter in the provided string and appends them to the specified container element.
 *  Each tile is made draggable and is given a unique ID based on its position and the container it belongs to.
 *
 * @example
 * createTilesForLetters("leftTiles", "ABCDE"); // Creates draggable tiles for each letter and
 * appends them to the 'leftTiles' container.
 *
 * @param {string} containerId - The ID of the HTML element where the tiles will be appended.
 * @param {string} letters - A string of letters for which tiles will be created.
 * @returns {void}
 */
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

/**
 * Configures the game board to allow players to take back tiles they've placed during the current turn
 * by right-clicking (context menu) on the tiles. Each tile placed on the board is tracked, and when a tile is
 * right-clicked, it checks if the tile was placed in the current turn. If so, the tile is moved back to the
 * player's hand (either left or right, depending on its origin), and the game board and player's tiles are
 * updated accordingly.
 *
 * This function iterates over each cell in the game board, attaching a 'contextmenu' event listener to prevent
 * the default context menu from appearing and to execute the take-back logic. The function ensures that only
 * tiles placed in the current turn can be taken back, maintaining game integrity and preventing manipulation
 * of tiles placed in previous turns.
 *
 * @example
 * setupTakeBackTile(); // Call this function after the game board is initialized and each time the board or the current turn's tiles are updated.
 *
 * Notes/Prerequisites:
 * - Assumes 'gameBoard' is a 2D array representing the board, where each cell contains tile information.
 * - Utilizes 'currentTurnPlacedTiles', an array tracking tiles placed during the current turn, including their positions and origins.
 * - Depends on 'leftLetters' and 'rightLetters' strings to manage the letters in each player's hand.
 * - Requires the 'refreshTiles' function to visually update the tiles in the players' hands on the UI.
 * - Uses 'cellElement.innerText' to clear the visual representation of a tile on the board when it is taken back.
 */
function setupTakeBackTile() {
  gameBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.getElementById(`${rowIndex} ${colIndex}`);
      cellElement?.addEventListener("contextmenu", () => {
        const tileIndex = currentTurnPlacedTiles.findIndex(
          (t) => t.row === rowIndex && t.col === colIndex
        );
        if (tileIndex !== -1) {
          const tile = currentTurnPlacedTiles[tileIndex];

          if (tile.origin === "left") {
            leftLetters += tile.char;
            refreshTiles("leftTiles", leftLetters);
          } else if (tile.origin === "right") {
            rightLetters += tile.char;
            refreshTiles("rightTiles", rightLetters);
          }

          gameBoard[rowIndex][colIndex].char = "";
          cellElement.innerText = "";
          currentTurnPlacedTiles.splice(tileIndex, 1);
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");
  if (boardElement) {
    createBoard(boardElement, 15, 15, gameBoard);
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
  setupTakeBackTile();
});

if (submitButton) {
  submitButton.addEventListener("click", () => {
    console.log(gameBoard);
    if (
      checkWordsOnBoard(gameBoard, library) &&
      gameBoard[7][7].char !== "" &&
      countConnectedLetters(gameBoard, 7, 7) === countPlacedSquares(gameBoard)
    ) {
      const tiles = document.querySelectorAll(".tile");
      tiles.forEach((tile) => {
        tile.className = "notMovableEnyMore";
        tile.setAttribute("draggable", "false");
      });
      turn++;
      const leftTiles = document.getElementById("leftTiles");
      const rightTiles = document.getElementById("rightTiles");

      if (turn % 2 === 0) {
        //Odd turns are player 2 even are player 1
        //Add score to player2
        if (player2.currentWords.length !== 0) {
          addPlayerScore(2, roundScore);
        }
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
        if (player1.currentWords.length !== 0) {
          addPlayerScore(1, roundScore);
        }

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
        currentTurnPlacedTiles = [];
      }
    }
  });
}

if (changeLettersButton) {
  changeLettersButton.addEventListener("click", () => {
    if (turn % 2 === 0) {
      while (leftLetters.length !== 0) {
        // Enqueue the last letter of leftLetters into the letterQueue
        q.enqueue(leftLetters.substring(leftLetters.length - 1), letterQueue);
        // Remove the last letter from leftLetters
        leftLetters = leftLetters.substring(0, leftLetters.length - 1);
      }
      refreshTiles("leftTiles", leftLetters);
    } else {
      while (rightLetters.length !== 0) {
        // Enqueue the last letter of rightLetters into the letterQueue
        q.enqueue(rightLetters.substring(rightLetters.length - 1), letterQueue);
        // Remove the last letter from rightLetters
        rightLetters = rightLetters.substring(0, rightLetters.length - 1);
      }
      refreshTiles("rightTiles", rightLetters);
    }
  });
}
const startButton = document.getElementById("startButton");
const loginButton = document.getElementById("loginButton1");
const loginButton2 = document.getElementById("loginButton2");
const createUserButton = document.getElementById("createUser");

const loginContainer = document.getElementById("login-container");
const outerDiv = document.getElementById("outerDiv");
const p1HTML = document.getElementById("player1-name");
const p2HTML = document.getElementById("player2-name");

if (startButton !== null) {
  startButton.addEventListener("click", () => {
    if (loginContainer) loginContainer.style.display = "none";
    if (outerDiv) outerDiv.style.display = "block";
    if (p1HTML) p1HTML.innerText = `${player1.user}`;
    if (p2HTML) p2HTML.innerHTML = `${player2.user}`;
  });
}

if (loginButton !== null) {
  loginButton.addEventListener("click", validateLogin);
}

if (loginButton2) {
  loginButton2.addEventListener("click", validateLogin2);
}

if (createUserButton) {
  createUserButton.addEventListener("click", validateUserCreation);
}
