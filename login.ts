function validateLogin() {
  ///Exempel funktion
  const usernameInput = document.getElementById(
    "username1"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "password1"
  ) as HTMLInputElement;
  if (usernameInput && passwordInput) {
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(username);
    console.log(password);

    if (username === "" || password === "") {
      console.log("Please enter both username and password");
    } else {
      console.log("Login successful!");
    }
  }
}

const loginButton = document.getElementById("loginButton1");
const loginButton2 = document.getElementById("loginButton2"); //Behöver också en eventlistener
const createUserButton = document.getElementById("createUser"); //Behöver också en eventlistener

if (loginButton) {
  loginButton.addEventListener("click", validateLogin);
}
