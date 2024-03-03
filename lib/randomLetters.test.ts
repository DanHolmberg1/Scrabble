import { Queue } from "./queue_array";
import { generateRandomLetters } from "./randomLetters";
import { is_empty } from "./queue_array";

let que:Queue<string> = generateRandomLetters();


test("getPoints", () => {
    expect(!is_empty(que)).toBeTruthy;
  });