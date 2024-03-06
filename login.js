"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCreation = exports.validateLogin2 = exports.validateLogin = void 0;
var players_1 = require("./lib/players");
/**
 * Takes username and password from the first log in form. If user exists and
 * password matches the user is paired to player1.
 */
function validateLogin() {
    var usernameInput = document.getElementById("username1" //html id of username 1
    );
    var passwordInput = document.getElementById("password1");
    if (usernameInput && passwordInput) {
        var username = usernameInput.value;
        var password = passwordInput.value;
        var playerUser = (0, players_1.findUser)(username);
        if (password == playerUser.password && playerUser.userName !== "") {
            (0, players_1.setUserName)(1, username);
            console.log("Successfull login p1!");
        }
    }
}
exports.validateLogin = validateLogin;
/**
 * Takes username and password from the second log in form. If user exists and
 * password matches the user is paired to player2.
 */
function validateLogin2() {
    var usernameInput = document.getElementById("username2" //html id of username 2
    );
    var passwordInput = document.getElementById("password2");
    if (usernameInput && passwordInput) {
        var username = usernameInput.value;
        var password = passwordInput.value;
        var playerUser = (0, players_1.findUser)(username);
        if (password == playerUser.password && playerUser.userName !== "") {
            (0, players_1.setUserName)(2, username);
            console.log("Success!");
            alert("Successfull login p2!");
        }
    }
}
exports.validateLogin2 = validateLogin2;
/**
 * Takes username and the two passwords from the user creation form. If no User
 * already exists with chosen username and the two passwords match a new User is
 * created and saved.
 */
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
            alert("New user created!");
        }
    }
}
exports.validateUserCreation = validateUserCreation;
