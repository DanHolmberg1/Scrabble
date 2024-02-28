function validateLogin() {
  // only works for loginButton1
  ///Exempel funktion
  const usernameInput = document.getElementById(
    "username1" //html id of username 1
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "password1"
  ) as HTMLInputElement;
  if (usernameInput && passwordInput) {
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(username);
    console.log(password);
  }
}

function validateLogin2() {}

const loginButton = document.getElementById("loginButton1");
const loginButton2 = document.getElementById("loginButton2"); //Behöver också en eventlistener
const createUserButton = document.getElementById("createUser"); //Behöver också en eventlistener

if (loginButton !== null) {
  loginButton.addEventListener("click", validateLogin);
}
if (loginButton2) {
  loginButton2.addEventListener("click", validateLogin2);
}
