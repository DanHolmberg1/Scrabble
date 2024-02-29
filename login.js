"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var players_1 = require("./lib/players");
function validateLogin() {
    var usernameInput = document.getElementById("username1" //html id of username 1
    );
    var passwordInput = document.getElementById("password1");
    if (usernameInput && passwordInput) {
        var username = usernameInput.value;
        var password = passwordInput.value;
        var playerUser = (0, players_1.findUser)(username);
        if (password == playerUser.password) {
            (0, players_1.setUserName)(1, username);
            console.log("Success!");
        }
    }
}
function validateLogin2() {
    var usernameInput = document.getElementById("username2" //html id of username 2
    );
    var passwordInput = document.getElementById("password2");
    if (usernameInput && passwordInput) {
        var username = usernameInput.value;
        var password = passwordInput.value;
        var playerUser = (0, players_1.findUser)(username);
        if (password == playerUser.password) {
            (0, players_1.setUserName)(2, username);
            console.log("Success!");
        }
    }
}
function validateUserCreation() {
    var usernameInput = document.getElementById("newUsername" //html id of username 1
    );
    var passwordInput = document.getElementById("passwordForNewUser");
    var retypePassword = document.getElementById("retypePassword");
    if (usernameInput && passwordInput && retypePassword) {
        var username = usernameInput.value;
        var password = passwordInput.value;
        var passwordConfirmation = retypePassword.value;
        var userCheck = (0, players_1.findUser)(username);
        if (userCheck.userName == "" && password == passwordConfirmation) {
            (0, players_1.makeNewUser)(username, password);
        }
    }
}
var loginButton = document.getElementById("loginButton1");
var loginButton2 = document.getElementById("loginButton2");
var createUserButton = document.getElementById("createUser");
if (loginButton !== null) {
    loginButton.addEventListener("click", validateLogin);
}
if (loginButton2) {
    loginButton2.addEventListener("click", validateLogin2);
}
if (createUserButton) {
    createUserButton.addEventListener("click", validateUserCreation);
}
