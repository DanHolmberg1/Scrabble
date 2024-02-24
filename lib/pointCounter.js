"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoints = void 0;
var pointList = {
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
var testBoard = [
    [
        {
            row: 0,
            col: 0,
            special: 2,
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
            special: 4,
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
            special: 1,
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
            special: 4,
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
            special: 2,
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
            special: 1,
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
            special: 2,
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
            special: 2,
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
            special: 1,
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
            special: 3,
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
            special: 1,
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
            special: 1,
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
            special: 3,
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
            special: 2,
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
            special: 3,
            char: "",
        },
        {
            row: 3,
            col: 8,
            special: 0,
            char: "T",
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
            special: 2,
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
            special: 4,
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
            special: 3,
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
            special: 1,
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
            special: 1,
            char: "K",
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
            special: 3,
            char: "U",
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
            special: 4,
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
            special: 2,
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
            special: 2,
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
            char: "I",
        },
        {
            row: 5,
            col: 9,
            special: 2,
            char: "U",
        },
        {
            row: 5,
            col: 10,
            special: 0,
            char: "B",
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
            special: 2,
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
            special: 1,
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
            special: 1,
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
            char: "",
        },
        {
            row: 6,
            col: 7,
            special: 0,
            char: "",
        },
        {
            row: 6,
            col: 8,
            special: 0,
            char: "E",
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
            special: 1,
            char: "J",
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
            special: 1,
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
            special: 1,
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
            special: 3,
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
            special: 5,
            char: "",
        },
        {
            row: 7,
            col: 8,
            special: 0,
            char: "C",
        },
        {
            row: 7,
            col: 9,
            special: 0,
            char: "A",
        },
        {
            row: 7,
            col: 10,
            special: 0,
            char: "R",
        },
        {
            row: 7,
            col: 11,
            special: 3,
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
            special: 1,
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
            special: 1,
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
            special: 1,
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
            special: 1,
            char: "I",
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
            special: 1,
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
            special: 2,
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
            special: 2,
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
            special: 2,
            char: "",
        },
        {
            row: 9,
            col: 10,
            special: 0,
            char: "Q",
        },
        {
            row: 9,
            col: 11,
            special: 0,
            char: "A",
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
            special: 2,
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
            special: 4,
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
            special: 3,
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
            special: 1,
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
            special: 1,
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
            special: 3,
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
            special: 4,
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
            special: 2,
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
            special: 3,
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
            special: 2,
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
            special: 3,
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
            special: 1,
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
            special: 1,
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
            special: 3,
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
            special: 1,
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
            special: 2,
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
            special: 2,
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
            special: 1,
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
            special: 2,
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
            special: 4,
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
            special: 1,
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
            special: 4,
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
            special: 2,
            char: "",
        },
    ],
];
var testPlayer = {
    currentScore: 0,
    user: "David",
    currentWords: [
        {
            row: 9,
            col: 10,
            special: 0,
            char: "Q",
        },
        {
            row: 8,
            col: 10,
            special: 1,
            char: "I",
        },
        {
            row: 6,
            col: 10,
            special: 1,
            char: "J",
        },
        {
            row: 4,
            col: 10,
            special: 3,
            char: "U",
        },
    ],
};
function getPoints(gameBoard, player) {
    var memoizedCells = [];
    function treverse(gameBoard, startCell, currentPoints, treverseRowStep, treverseColumnStep, playerCellsFromStart, multiplier) {
        var startCellChar = startCell.char;
        var points = 0;
        var existsInCellsArray = playerCellsFromStart.some(function (item) {
            return item.row === startCell.row &&
                item.col === startCell.col &&
                item.special === startCell.special &&
                item.char === startCell.char;
        });
        if (startCell.special === 3 && existsInCellsArray) {
            multiplier = 2;
        }
        else if (startCell.special === 4 && existsInCellsArray) {
            multiplier = 3;
        }
        if (startCellChar !== "") {
            points =
                pointList[startCellChar.toLowerCase()] *
                    multiplier;
        }
        if (startCell.special === 1 && existsInCellsArray) {
            points = points * 2;
        }
        else if (startCell.special === 2 && existsInCellsArray) {
            points = points * 3;
        }
        console.log("were on this cell: ", startCell);
        var existsInMemo = memoizedCells.some(function (item) {
            return item.row === startCell.row &&
                item.col === startCell.col &&
                item.special === startCell.special &&
                item.char === startCell.char;
        });
        console.log("in(true) or not(false) in memory", existsInMemo);
        if (existsInMemo) {
            points = 0;
        }
        else {
            memoizedCells.push(startCell);
        }
        var row = startCell.row;
        var col = startCell.col;
        console.log("memoized cells: ", memoizedCells);
        console.log("pointsgivven: ", points);
        if (startCell.char === "") {
            return 0;
        }
        else {
            return (points +
                treverse(gameBoard, gameBoard[row + treverseRowStep][col + treverseColumnStep], currentPoints + points, treverseRowStep, treverseColumnStep, playerCellsFromStart, multiplier));
        }
    }
    var result = 0;
    player.currentWords.sort(function (a, b) { return b.special - a.special; });
    console.log(player.currentWords);
    for (var i = 0; i < player.currentWords.length; i++) {
        var currentPlacedCell = player.currentWords[i];
        result +=
            treverse(gameBoard, currentPlacedCell, 0, -1, 0, player.currentWords, 1) +
                treverse(gameBoard, currentPlacedCell, 0, 1, 0, player.currentWords, 1) +
                treverse(gameBoard, currentPlacedCell, 0, 0, -1, player.currentWords, 1) +
                treverse(gameBoard, currentPlacedCell, 0, 0, 1, player.currentWords, 1);
    }
    return result;
}
exports.getPoints = getPoints;
console.log(getPoints(testBoard, testPlayer));
