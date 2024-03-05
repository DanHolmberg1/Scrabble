import { cell } from "../main";
import { getUsers, User, saveUsers } from "./saveData";

/**
 * A number that can be either 1 or 2.
 * Used to determine if a function should apply to player 1 or 2
 */
type PlayerNumber = 1 | 2;

/**
 * A record that has three elements. Is used for creation of players. 
 */
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

/**
 * Returns the current score of the chosen player
 * 
 * @example
 * getPlayerScore(1) returns 0 at the start of the program, 
 * since it is the defaultscore of player 1
 * 
 * @param {PlayerNumber} player - determines which player to get score from 
 * @returns {number} Returns currentScore of player1 or player2
 */
export function getPlayerScore(player: PlayerNumber): number {
  return player == 1 ? player1.currentScore : player2.currentScore;
}

/**
 * Takes input score and adds it to the chosen players current score
 * @param {PlayerNumber} player - determines which player to add score to 
 * @param {number} addScore - the amount to add to currentScore
 */
export function addPlayerScore(player: PlayerNumber, addScore: number): void {
  player == 1
    ? (player1.currentScore = player1.currentScore + addScore)
    : (player2.currentScore = player2.currentScore + addScore);
}

/**
 * Sets the current score of all players to 0
 */
export function resetScores(): void {
  player1.currentScore = 0;
  player2.currentScore = 0;
}

/**
 * Changes the chosen players username to the given name
 * @param {PlayerNumber} player - determines which player to change username 
 * @param {string} userName - the new username for the player
 */
export function setUserName(player: PlayerNumber, userName: string): void {
  player == 1 ? (player1.user = userName) : (player2.user = userName);
}

/**
 * Empties the currenWord of all players 
 */
export function resetCurrentWord(): void {
  player1.currentWords = [];
  player2.currentWords = [];
}

/**
 * Adds the given cell to currentWord of the chosen player
 * @param {PlayerNumber} player - determines which player to add the cell to 
 * @param {cell<number, string>} currentCell - the cell to add to currentWord
 */
export function addToCurrentWord(
  player: PlayerNumber,
  currentCell: cell<number, string>
): void {
  player == 1
    ? player1.currentWords.push(currentCell)
    : player2.currentWords.push(currentCell);
}

/**
 * Removes the given cell from currenWord of the chosen player.
 * Does nothing if the cell does not exist in currentWord
 * @param {PlayerNumber} player - determines which player to remove the cell from 
 * @param {cell<number, string>} currentCell - the cell ro remove from currentWord
 */
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

/**
 * Returns the currentWord array from the given player
 * @param {PlayerNumber} player - determines which player to get currentWord from. 
 * @returns {Array<cell<number, string>>} - returns the array of cells from currentWord.
 */
export function getCurrentWord(
  player: PlayerNumber
): Array<cell<number, string>> {
  return player == 1 ? player1.currentWords : player2.currentWords;
}

/**
 * Returns the user with matching username from saved data. 
 * Returns an empty user if username is not found.
 * @param {string} userName - searches for user with this name
 * @returns {User} - Returns the User with matching username or an empty User.
 */
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

/**
 * If current score of any player is higher than the highscore of paired User
 * the highscore will be overwritten by the current score.
 * Applies to all players
 */
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

/**
 * Creates a new User with given name and password and saves it to save data.
 * @param {string} username - username for new User
 * @param {string }password - password for new User
 */
export function makeNewUser(username: string, password: string): void {
  let users: Array<User> = getUsers();
  const newUser: User = {userName: username, password: password, highScore: 0}
  users.push(newUser);
  saveUsers(users);
}

