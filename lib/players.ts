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

let player1 = {
  currentScore: 0,
  user: "",
  currentWord: [],
};

let player2 = {
  currentScore: 0,
  user: "",
  currentWord: [],
};

function getPlayerScore(player: PlayerNumber): number {
  return player == 1 ? player1.currentScore : player2.currentScore;
}

function addPlayerScore(player: PlayerNumber, addScore: number): void {
  player == 1
    ? (player1.currentScore = player1.currentScore + addScore)
    : (player2.currentScore = player2.currentScore + addScore);
}

function resetScores(): void {
  player1.currentScore = 0;
  player2.currentScore = 0;
}

function setUserName(player: PlayerNumber, userName: string): void {
  player == 1 ? (player1.user = userName) : (player2.user = userName);
}
