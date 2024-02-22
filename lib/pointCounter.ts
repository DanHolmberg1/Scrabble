import { cell } from "../main";
import { Player } from "./players";

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

function getPoints(
  gameBoard: Array<Array<cell<number, string>>>,
  player: Player
): void {
  const currentCell = player.currentWords[-1];

  function treverseLeft(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currentPoints: number
  ): number {
    const row = startCell.row;
    const col = startCell.col;
    if (startCell.char === "") {
      return 0;
    } else {
      return (
        currentPoints + treverseLeft(gameBoard, gameBoard[row - 1][col], 0)
      );
    }
  }

  function treverseRigth(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currentPoints: number
  ): number {
    const row = startCell.row;
    const col = startCell.col;
    if (startCell.char === "") {
      return 0;
    } else {
      return (
        currentPoints + treverseRigth(gameBoard, gameBoard[row + 1][col], 0)
      );
    }
  }

  function treverseUp(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currentPoints: number
  ): number {
    const row = startCell.row;
    const col = startCell.col;
    if (startCell.char === "") {
      return 0;
    } else {
      return currentPoints + treverseUp(gameBoard, gameBoard[row][col - 1], 0);
    }
  }

  function treverseDown(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currentPoints: number
  ): number {
    const row = startCell.row;
    const col = startCell.col;
    if (startCell.char === "") {
      return 0;
    } else {
      return (
        currentPoints + treverseDown(gameBoard, gameBoard[row][col + 1], 0)
      );
    }
  }

  function treverseCollumn(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currenPoints: number
  ): number {
    const col = startCell.col;
    const row = startCell.row;
    const startCellChar: string = startCell.char;
    const points = pointList[startCellChar as keyof typeof pointList];
    if (startCell.char === "") {
      startCell;
      return 0;
    } else {
      return (
        currenPoints +
        treverseCollumn(
          gameBoard,
          gameBoard[row][col + 1],
          currenPoints + points
        ) +
        treverseCollumn(
          gameBoard,
          gameBoard[row][col - 1],
          currenPoints + points
        )
      );
    }
  }

  function treverseRow(
    gameBoard: Array<Array<cell<number, string>>>,
    startCell: cell<number, string>,
    currenPoints: number
  ): number {
    const col = startCell.col;
    const row = startCell.row;
    const startCellChar: string = startCell.char;
    const points = pointList[startCellChar as keyof typeof pointList];
    if (startCell.char === "") {
      startCell;
      return 0;
    } else {
      return (
        currenPoints +
        treverseRow(
          gameBoard,
          gameBoard[row + 1][col],
          currenPoints + points + treverseCollumn(gameBoard)
        ) +
        treverseRow(
          gameBoard,
          gameBoard[row - 1][col],
          currenPoints + points + treverseCollumn(gameBoard)
        )
      );
    }
  }

  treverseRow(gameBoard, player.currentWords[-1], 0);
}
