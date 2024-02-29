import {User} from "./lib/saveData"
import {findUser, setUserName, makeNewUser} from "./lib/players"


function validateLogin(): void {
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

    if (password == playerUser.password) {
      setUserName(1, username);
      console.log("Success!");
    }
  }
}

function validateLogin2(): void {
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

    if (password == playerUser.password) {
      setUserName(2, username);
      console.log("Success!");
    }
  }
}

function validateUserCreation(): void {
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

const loginButton = document.getElementById("loginButton1");
const loginButton2 = document.getElementById("loginButton2"); 
const createUserButton = document.getElementById("createUser"); 

if (loginButton !== null) {
  loginButton.addEventListener("click", validateLogin);
}

if (loginButton2) {
  loginButton2.addEventListener("click", validateLogin2);
}

if (createUserButton){
  createUserButton.addEventListener("click", validateUserCreation)
}
