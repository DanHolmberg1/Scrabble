import {User} from "./lib/saveData"
import {findUser, setUserName, makeNewUser} from "./lib/players"

/**
 * Takes username and password from the first log in form. If user exists and
 * password matches the user is paired to player1.
 */
export function validateLogin(): void {
  const usernameInput = document.getElementById(
    "username1" //html id of username 1
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "password1"
  ) as HTMLInputElement;
  if (usernameInput && passwordInput) {
    const username: string = usernameInput.value;
    const password: string = passwordInput.value;
    const playerUser: User = findUser(username);

    if (password == playerUser.password && playerUser.userName !== "") {
      setUserName(1, username);
      console.log("Success!");
    }
  }
}

/**
 * Takes username and password from the second log in form. If user exists and
 * password matches the user is paired to player2.
 */
export function validateLogin2(): void {
  const usernameInput = document.getElementById(
    "username2" //html id of username 2
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "password2"
  ) as HTMLInputElement;
  if (usernameInput && passwordInput) {
    const username: string = usernameInput.value;
    const password: string = passwordInput.value;
    const playerUser: User = findUser(username);

    if (password == playerUser.password && playerUser.userName !== "") {
      setUserName(2, username);
      console.log("Success!");
    }
  }
}

/**
 * Takes username and the two passwords from the user creation form. If no User
 * already exists with chosen username and the two passwords match a new User is
 * created and saved.
 */
export function validateUserCreation(): void {
  const usernameInput = document.getElementById(
    "newUsername" //html id of username 1
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "passwordForNewUser"
  ) as HTMLInputElement;
  const retypePassword = document.getElementById(
    "retypePassword"
  ) as HTMLInputElement;

  if (usernameInput && passwordInput && retypePassword) {
    const username: string = usernameInput.value;
    const password: string = passwordInput.value;
    const passwordConfirmation: string = retypePassword.value;
    const userCheck: User = findUser(username);

    if (userCheck.userName == "" && password == passwordConfirmation){
      makeNewUser(username, password);
    }
  }
}
