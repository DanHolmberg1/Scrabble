import { cell } from "../main";
import { getUsers, User, saveUsers } from "./saveData";

type PlayerNumber = 1 | 2;

export type Player = {
  currentScore: number;
  user: string;
  currentWords: Array<cell<number, string>>;
};

export let player1: Player = {
  currentScore: 0,
  user: "",
  currentWords: [],
};

export let player2: Player = {
  currentScore: 0,
  user: "",
  currentWords: [],
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
  player1.currentWords = [];
  player2.currentWords = [];
}

export function addToCurrentWord(
  player: PlayerNumber,
  currentCell: cell<number, string>
): void {
  player == 1
    ? player1.currentWords.push(currentCell)
    : player2.currentWords.push(currentCell);
}

export function removeFromCurrentWord(
  player: PlayerNumber,
  currentCell: cell<number, string>
): void {
  const playerWord: Array<cell<number, string>> =
    player == 1 ? player1.currentWords : player2.currentWords;
  const index: number = playerWord.indexOf(currentCell);

  if (index > -1) {
    playerWord.splice(index, 1);
  }
}

export function getCurrentWord(
  player: PlayerNumber
): Array<cell<number, string>> {
  return player == 1 ? player1.currentWords : player2.currentWords;
}

export function findUser(userName: string): User {
  let i: number = 0;
  let userArray: Array<User> = getUsers()
  while(i < userArray.length){
    if (userArray[i].userName == userName){
      return userArray[i]
    }else{
      i++
    }
  }
  let emptyUser: User = {userName: "", password: "", highScore: 0}
  return emptyUser;
  
}

export function updateHighscore(): void {
  let user1: User = findUser(player1.user)
  let user2: User = findUser(player2.user)
  let newUserArray: Array<User> = getUsers()
  let userIndex: number = 0;
  let userIndex2: number = 0;
  while (userIndex < newUserArray.length){
    if(newUserArray[userIndex].userName == user1.userName){
      break;
    }else{
      userIndex++;
    }
  }
  if (player1.user !== ""){
    if (player1.currentScore > user1.highScore || user1.userName !== "") {
      newUserArray[userIndex].highScore = player1.currentScore;
    }
  }

  while (userIndex2 < newUserArray.length){
    if(newUserArray[userIndex2].userName == user2.userName){
      break;
    }else{
      userIndex2++;
    }
  }
  if (player2.user !== ""){
    if (player2.currentScore > user2.highScore || user2.userName !== "") {
      newUserArray[userIndex2].highScore = player2.currentScore;
    }
  }
  saveUsers(newUserArray);
}

export function makeNewUser(username: string, password: string): void {
  let users: Array<User> = getUsers();
  const newUser: User = {userName: username, password: password, highScore: 0}
  users.push(newUser);
  saveUsers(users);
}

