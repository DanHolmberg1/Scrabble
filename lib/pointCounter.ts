import { get } from "http";
import { cell } from "../main";
import { Player } from "./players";

let outerEdges = { maxRow: 14, minRow: 0, maxCol: 14, minCol: 0 };

const pointList = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

/************
 * Gets the points from a specified player the current turn
 * @param  gameBoard the current gameBoard
 * @param player a Player object
 * @invariant player object must contain the the current players words
 * that is on the board for the specific round
 * @returns number of points given for the laid letters
 */
export function getPoints(
  gameBoard: Array<Array<cell<number, string>>>,
  player: Player
): number {
  let memoizedCells: Array<cell<number, string>> = [];
  //console.log("");
  //console.log("");
  //console.log("");
  //console.log("");
  //console.log("");
  function treverse(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currentPoints: number,
    treverseRowStep: number,
    treverseColumnStep: number,
    playerCellsFromStart: Array<cell<number, string>>,
    multiplier: number
  ): number {
    const startCellChar: string = startCell.char;
    let points: number = 0;

    let existsInCellsArray = playerCellsFromStart.some(
      (item) =>
        item.row === startCell.row &&
        item.col === startCell.col &&
        item.special === startCell.special &&
        item.char === startCell.char
    );

    if (startCell.special === 3 && existsInCellsArray) {
      multiplier = 2;
    } else if (startCell.special === 4 && existsInCellsArray) {
      multiplier = 3;
    }

    if (startCellChar !== "") {
      points =
        pointList[startCellChar.toLowerCase() as keyof typeof pointList] *
        multiplier;
    }

    if (startCell.special === 1 && existsInCellsArray) {
      points = points * 2;
    } else if (startCell.special === 2 && existsInCellsArray) {
      points = points * 3;
    }

    //console.log("were on this cell: ", startCell);

    let existsInMemo = memoizedCells.some(
      (item) =>
        item.row === startCell.row &&
        item.col === startCell.col &&
        item.special === startCell.special &&
        item.char === startCell.char
    );
    //console.log("in(true) or not(false) in memory", existsInMemo);

    if (existsInMemo) {
      points = 0;
    } else {
      memoizedCells.push(startCell);
    }

    const row = startCell.row;
    const col = startCell.col;
    //console.log("memoized cells: ", memoizedCells);

    //console.log("pointsgivven: ", points);

    if (row === outerEdges.maxRow && treverseRowStep > 0) {
      return points;
    }
    if (row === outerEdges.minRow && treverseRowStep < 0) {
      return points;
    }
    if (col === outerEdges.maxCol && treverseColumnStep > 0) {
      return points;
    }
    if (col === outerEdges.minCol && treverseColumnStep < 0) {
      return points;
    }

    if (startCell.char === "") {
      return 0;
    } else {
      return (
        points +
        treverse(
          gameBoard,
          gameBoard[row + treverseRowStep][col + treverseColumnStep],
          currentPoints + points,
          treverseRowStep,
          treverseColumnStep,
          playerCellsFromStart,
          multiplier
        )
      );
    }
  }

  let result: number = 0;
  player.currentWords.sort((a, b) => b.special - a.special);
  //console.log(player.currentWords);
  for (let i = 0; i < player.currentWords.length; i++) {
    const currentPlacedCell = player.currentWords[i];

    result +=
      treverse(gameBoard, currentPlacedCell, 0, -1, 0, player.currentWords, 1) +
      treverse(gameBoard, currentPlacedCell, 0, 1, 0, player.currentWords, 1) +
      treverse(gameBoard, currentPlacedCell, 0, 0, -1, player.currentWords, 1) +
      treverse(gameBoard, currentPlacedCell, 0, 0, 1, player.currentWords, 1);
  }

  return result;
}
