import { getPlayerScore, addPlayerScore, resetScores, player1, player2, addToCurrentWord, removeFromCurrentWord, resetCurrentWord,
         setUserName, 
         getCurrentWord} from "./players";
import { User, jsonToUserArray, userArrayToJson } from "./saveData";
import { cell } from "../main";

//adding score to player 1
test("scoreTest", () => {
    addPlayerScore(1, 50);
    let playerScore: number = getPlayerScore(1);
    expect(playerScore).toEqual(50)
});

//adding score to player 2
test("scoreTest2", () => {
    addPlayerScore(2, 50);
    let playerScore: number = getPlayerScore(2);
    expect(playerScore).toEqual(50)
});

test("resetScores", () => {
    addPlayerScore(1, 50);
    resetScores();
    let playerScore: number = getPlayerScore(1);
    expect(playerScore).toEqual(0);
});

test("currentWordTest", () => {
    let testCell: cell<number,string> = {row: 2, col: 3, special: 4, char: "G"}
    addToCurrentWord(1, testCell);
    let wordArray: Array<cell<number, string>> = player1.currentWords
    expect(wordArray[0].char).toBe("G");
    removeFromCurrentWord(1, testCell);
    let testEmptyArray: Array<cell<number,string>> = [];
    expect(getCurrentWord(1)).toStrictEqual(testEmptyArray);

    addToCurrentWord(2, testCell);
    let wordArray2: Array<cell<number, string>> = player2.currentWords
    expect(wordArray2[0].char).toBe("G");
    removeFromCurrentWord(2, testCell);
    expect(player2.currentWords).toStrictEqual(testEmptyArray);
});

test("currentWordTest2", () => {
    let testCell: cell<number,string> = {row: 2, col: 3, special: 4, char: "G"}
    addToCurrentWord(2, testCell);
    let testEmptyArray: Array<cell<number,string>> = [];
    resetCurrentWord();
    expect(getCurrentWord(2)).toStrictEqual(testEmptyArray);
});

test("currentWordTest3", () => {
    let testCell: cell<number,string> = {row: 2, col: 3, special: 4, char: "G"}
    let testCell2: cell<number,string> = {row: 5, col: 2, special: 1, char: "A"}
    addToCurrentWord(1, testCell);
    removeFromCurrentWord(1, testCell2);
    expect(getCurrentWord(1)).toStrictEqual([testCell]);
});

test("nameTest", () => {
    setUserName(1, "Anton");
    expect(player1.user).toBe("Anton")
});

test("jsonTest", () => {
    let testUser1: User = {userName: "Anton", password: "ost123", highScore: 0}
    let testUser2: User = {userName: "David", password: "tomater", highScore: 0}
    let testUserArray: Array<User> = [testUser1, testUser2];
    let stringArray: string = userArrayToJson(testUserArray);
    let finalArray: Array<User> = jsonToUserArray(stringArray);
    expect(finalArray).toStrictEqual(testUserArray);
});

