import { countConnectedLetters, countPlacedSquares } from "./dfs";
import { cell } from "../main";

describe('countConnectedLetters', () => {
  test('should return 0 for an empty board', () => {
    const gameBoard: Array<Array<cell<number, string>>> = []
    const result = countConnectedLetters(gameBoard, 0, 0);
    expect(result).toBe(0);
  });

  test('should correctly count connected letters in a simple case', () => {
    const gameBoard: Array<Array<cell<number, string>>> = [
        [{ row: 0, col: 0, special: 0, char: 'A' }, { row: 0, col: 1, special: 0, char: 'A' }],
        [{ row: 1, col: 0, special: 0, char: '' }, { row: 1, col: 1, special: 0, char: 'A' }]
      ];
    const result = countConnectedLetters(gameBoard, 0, 0);
    expect(result).toBe(3);
  });

  test('should return 0 for out-of-bounds starting positions', () => {
    const gameBoard: Array<Array<cell<number, string>>> = [
        [{ row: 0, col: 0, special: 0, char: 'A' }, { row: 0, col: 1, special: 0, char: 'A' }],
        [{ row: 1, col: 0, special: 0, char: '' }, { row: 1, col: 1, special: 0, char: 'A' }]
      ];
    expect(countConnectedLetters(gameBoard, -1, 0)).toBe(0);
    expect(countConnectedLetters(gameBoard, 0, -1)).toBe(0);
    expect(countConnectedLetters(gameBoard, 2, 0)).toBe(0);
    expect(countConnectedLetters(gameBoard, 0, 2)).toBe(0);
  });

  test('should return 0 for starting position with empty character', () => {
    const gameBoard: Array<Array<cell<number, string>>> = [
        [{ row: 0, col: 0, special: 0, char: 'A' }, { row: 0, col: 1, special: 0, char: '' }],
        [{ row: 1, col: 0, special: 0, char: '' }, { row: 1, col: 1, special: 0, char: 'A' }]
      ];
    const result = countConnectedLetters(gameBoard, 0, 1);
    expect(result).toBe(0);
  });
});

describe('countPlacedSquares', () => {
  test('should correctly count placed squares in a non-empty board', () => {
    const gameBoard: Array<Array<cell<number, string>>> = [
        [{ row: 0, col: 0, special: 0, char: 'A' }, { row: 0, col: 1, special: 0, char: 'B' }],
        [{ row: 1, col: 0, special: 0, char: '' }, { row: 1, col: 1, special: 0, char: 'C' }]
      ];
    const result = countPlacedSquares(gameBoard);
    expect(result).toBe(3);
  });

  test('should return 0 for an all-empty board', () => {
    const gameBoard: Array<Array<cell<number, string>>> = [
        [{ row: 0, col: 0, special: 0, char: '' }, { row: 0, col: 1, special: 0, char: '' }],
        [{ row: 1, col: 0, special: 0, char: '' }, { row: 1, col: 1, special: 0, char: '' }]
      ];
    const result = countPlacedSquares(gameBoard);
    expect(result).toBe(0);
  });

});
