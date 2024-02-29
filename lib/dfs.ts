import { cell } from "../main";


export function countConnectedLetters(
    gameBoard: Array<Array<cell<number, string>>>,
    startRow: number,
    startCol: number
  ): number {
    if (
      startRow < 0 ||
      startCol < 0 ||
      startRow >= gameBoard.length ||
      startCol >= gameBoard[startRow].length ||
      gameBoard[startRow][startCol].char === "" 
    ) {
      return 0;
    }
  
    const originalChar = gameBoard[startRow][startCol].char;
    gameBoard[startRow][startCol].char = "";
  
    let count = 1;
  
    const directions = [
      [-1, 0], // Up
      [0, 1],  // Right
      [1, 0],  // Down
      [0, -1], // Left
    ];
  
    // Explore adjacent cells
    for (let [dRow, dCol] of directions) {
      const newRow = startRow + dRow;
      const newCol = startCol + dCol;
      count += countConnectedLetters(gameBoard, newRow, newCol);
    }
  
    gameBoard[startRow][startCol].char = originalChar;
  
    return count;
  }


  export function countPlacedSquares(gameBoard: Array<Array<cell<number, string>>>): number {
    let count = 0;
  
    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        if (gameBoard[row][col].char !== "") {
          count++;
        }
      }
    }
  
    return count;
  }
  