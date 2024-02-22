import { cell } from "../main";

type PlayerNumber = 1 | 2;
type User = {
  userName: string;
  password: string;
  highScore: number;
};

export type Player = {
  currentScore: number;
  user: string;
  currentWords: Array<cell<number, string>>;
};

let player1: Player = {
  currentScore: 0,
  user: "",
  currentWord: [],
};

let player2: Player = {
  currentScore: 0,
  user: "",
  currentWord: [],
};

export function getPlayerScore(player: PlayerNumber): number {
  return player == 1 ? player1.currentScore : player2.currentScore;
}

export function addPlayerScore(player: PlayerNumber, addScore: number): void {
  player == 1
    ? (player1.currentScore = player1.currentScore + addScore)
    : (player2.currentScore = player2.currentScore + addScore);
}

export function resetScores(): void {
  player1.currentScore = 0;
  player2.currentScore = 0;
}

export function setUserName(player: PlayerNumber, userName: string): void {
  player == 1 ? (player1.user = userName) : (player2.user = userName);
}

export function resetCurrentWord(): void {
  player1.currentWord = [];
  player2.currentWord = [];
}

export function addToCurrentWord(player: PlayerNumber, currentCell: cell<number, string>): void {
  player == 1 ? player1.currentWord.push(currentCell) 
              : player2.currentWord.push(currentCell);
}

export function removeFromCurrentWord(player: PlayerNumber, currentCell: cell<number, string>): void {
  const playerWord: Array<cell<number, string>> = (player == 1 ? player1.currentWord 
                                                             : player2.currentWord);
  const index: number = playerWord.indexOf(currentCell);
  
  if (index > -1){
    playerWord.splice(index, 1)
  }

}

export function getCurrentWord(player: PlayerNumber): Array<cell<number, string>> {
  return player == 1 ? player1.currentWord : player2.currentWord;
}

