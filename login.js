function validateLogin() {
    ///Exempel funktion
    var usernameInput = document.getElementById("username1");
    var passwordInput = document.getElementById("password1");
    if (usernameInput && passwordInput) {
        var username = usernameInput.value;
        var password = passwordInput.value;
        console.log(username);
        console.log(password);
        if (username === "" || password === "") {
            console.log("Please enter both username and password");
        }
        else {
            console.log("Login successful!");
        }
    }
}
var loginButton = document.getElementById("loginButton1");
var loginButton2 = document.getElementById("loginButton2"); //Behöver också en eventlistener
var createUserButton = document.getElementById("createUser"); //Behöver också en eventlistener
if (loginButton) {
    loginButton.addEventListener("click", validateLogin);
}
