import { checkWordsOnBoard } from "./spellChecker";

const testBoard = [
  [
    {
      row: 0,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 0,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 1,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 1,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 2,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 2,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 3,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 3,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 4,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 4,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 5,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 5,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 6,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 6,
      special: 0,
      char: "F",
    },
    {
      row: 6,
      col: 7,
      special: 0,
      char: "A",
    },
    {
      row: 6,
      col: 8,
      special: 0,
      char: "T",
    },
    {
      row: 6,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 6,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 7,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 7,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 8,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 8,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 9,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 9,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 10,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 10,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 11,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 11,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 12,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 12,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 13,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 13,
      col: 14,
      special: 0,
      char: "",
    },
  ],
  [
    {
      row: 14,
      col: 0,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 1,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 2,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 3,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 4,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 5,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 6,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 7,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 8,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 9,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 10,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 11,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 12,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 13,
      special: 0,
      char: "",
    },
    {
      row: 14,
      col: 14,
      special: 0,
      char: "",
    },
  ],
];

test("checkWordsOnBoard", () => {
  expect(checkWordsOnBoard(testBoard)).toEqual(true);
});
