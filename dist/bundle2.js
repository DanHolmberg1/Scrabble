/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/players.js":
/*!************************!*\
  !*** ./lib/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.makeNewUser = exports.updateHighscore = exports.findUser = exports.getCurrentWord = exports.removeFromCurrentWord = exports.addToCurrentWord = exports.resetCurrentWord = exports.setUserName = exports.resetScores = exports.addPlayerScore = exports.getPlayerScore = exports.player2 = exports.player1 = void 0;\nvar saveData_1 = __webpack_require__(/*! ./saveData */ \"./lib/saveData.js\");\nexports.player1 = {\n    currentScore: 0,\n    user: \"\",\n    currentWords: [],\n};\nexports.player2 = {\n    currentScore: 0,\n    user: \"\",\n    currentWords: [],\n};\nfunction getPlayerScore(player) {\n    return player == 1 ? exports.player1.currentScore : exports.player2.currentScore;\n}\nexports.getPlayerScore = getPlayerScore;\nfunction addPlayerScore(player, addScore) {\n    player == 1\n        ? (exports.player1.currentScore = exports.player1.currentScore + addScore)\n        : (exports.player2.currentScore = exports.player2.currentScore + addScore);\n}\nexports.addPlayerScore = addPlayerScore;\nfunction resetScores() {\n    exports.player1.currentScore = 0;\n    exports.player2.currentScore = 0;\n}\nexports.resetScores = resetScores;\nfunction setUserName(player, userName) {\n    player == 1 ? (exports.player1.user = userName) : (exports.player2.user = userName);\n}\nexports.setUserName = setUserName;\nfunction resetCurrentWord() {\n    exports.player1.currentWords = [];\n    exports.player2.currentWords = [];\n}\nexports.resetCurrentWord = resetCurrentWord;\nfunction addToCurrentWord(player, currentCell) {\n    player == 1\n        ? exports.player1.currentWords.push(currentCell)\n        : exports.player2.currentWords.push(currentCell);\n}\nexports.addToCurrentWord = addToCurrentWord;\nfunction removeFromCurrentWord(player, currentCell) {\n    var playerWord = player == 1 ? exports.player1.currentWords : exports.player2.currentWords;\n    var index = playerWord.indexOf(currentCell);\n    if (index > -1) {\n        playerWord.splice(index, 1);\n    }\n}\nexports.removeFromCurrentWord = removeFromCurrentWord;\nfunction getCurrentWord(player) {\n    return player == 1 ? exports.player1.currentWords : exports.player2.currentWords;\n}\nexports.getCurrentWord = getCurrentWord;\nfunction findUser(userName) {\n    var i = 0;\n    var userArray = (0, saveData_1.getUsers)();\n    while (i < userArray.length) {\n        if (userArray[i].userName == userName) {\n            return userArray[i];\n        }\n        else {\n            i++;\n        }\n    }\n    var emptyUser = { userName: \"\", password: \"\", highScore: 0 };\n    return emptyUser;\n}\nexports.findUser = findUser;\nfunction updateHighscore() {\n    var user1 = findUser(exports.player1.user);\n    var user2 = findUser(exports.player2.user);\n    var newUserArray = (0, saveData_1.getUsers)();\n    var userIndex = 0;\n    var userIndex2 = 0;\n    while (userIndex < newUserArray.length) {\n        if (newUserArray[userIndex].userName == user1.userName) {\n            break;\n        }\n        else {\n            userIndex++;\n        }\n    }\n    if (exports.player1.user !== \"\") {\n        if (exports.player1.currentScore > user1.highScore || user1.userName !== \"\") {\n            newUserArray[userIndex].highScore = exports.player1.currentScore;\n        }\n    }\n    while (userIndex2 < newUserArray.length) {\n        if (newUserArray[userIndex2].userName == user2.userName) {\n            break;\n        }\n        else {\n            userIndex2++;\n        }\n    }\n    if (exports.player2.user !== \"\") {\n        if (exports.player2.currentScore > user2.highScore || user2.userName !== \"\") {\n            newUserArray[userIndex2].highScore = exports.player2.currentScore;\n        }\n    }\n    (0, saveData_1.saveUsers)(newUserArray);\n}\nexports.updateHighscore = updateHighscore;\nfunction makeNewUser(username, password) {\n    var users = (0, saveData_1.getUsers)();\n    var newUser = { userName: username, password: password, highScore: 0 };\n    users.push(newUser);\n    (0, saveData_1.saveUsers)(users);\n}\nexports.makeNewUser = makeNewUser;\n\n\n//# sourceURL=webpack:///./lib/players.js?");

/***/ }),

/***/ "./lib/saveData.js":
/*!*************************!*\
  !*** ./lib/saveData.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getUsers = exports.saveUsers = void 0;\nvar fs = __webpack_require__(/*! fs */ \"?d87b\");\n// npm install -D @types/node\n//fs.readFileSync('users.txt', 'utf8');\nfunction jsonToUserArray(jsonString) {\n    var tempJson = JSON.parse(jsonString);\n    var newArray = [];\n    tempJson.forEach(function (x) {\n        var newElement = JSON.parse(x);\n        var currentIndex = tempJson.indexOf(x);\n        newArray[currentIndex] = newElement;\n    });\n    return newArray;\n}\nfunction userArrayToJson(userArray) {\n    var tempArray = [];\n    userArray.forEach(function (x) {\n        var currentIndex = userArray.indexOf(x);\n        tempArray[currentIndex] = JSON.stringify(x);\n    });\n    return JSON.stringify(tempArray);\n}\nfunction saveUsers(userArray) {\n    fs.writeFile('./users.txt', userArrayToJson(userArray), function (err) {\n        if (err) {\n            throw err;\n        }\n    });\n}\nexports.saveUsers = saveUsers;\nfunction getUsers() {\n    var tempString = fs.readFileSync('./users.txt', 'utf8');\n    return jsonToUserArray(tempString);\n}\nexports.getUsers = getUsers;\n/*\nfunction testing(): void {\n    \n    fs.readFile('./users.txt', (err, data) => {\n        if (err) throw err;\n        tempString.push(data.toString());\n    });\n \n}\n\nlet tempString2: string = \"\"\n\nfetch(\"/users.txt\")\n  .then((response) => response.text())\n  .then((data) => {\n    // Split the data into an array using line breaks\n    const dataArray = data.toString();\n    tempString2 = dataArray;\n  })\n  .catch((error) => console.error(\"Error reading the file:\", error));\n\n\n\nfs.writeFile('./users.txt', \"testarmeragrejernu\", function(err){\n    if (err) {\n        throw err\n    }\n});\n\nlet testingArray: Array<User> = [];\n\nconst user1: User = {userName: \"Anton\", password: \"ost123\", highScore: 700}\nconst user2: User = {userName: \"David\", password: \"tomater\", highScore: 500}\n\ntestingArray[0] = user1;\ntestingArray[1] = user2;\n\nsaveUsers(testingArray);\n*/\n//console.log(tempString2);\n\n\n//# sourceURL=webpack:///./lib/saveData.js?");

/***/ }),

/***/ "./login.js":
/*!******************!*\
  !*** ./login.js ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar players_1 = __webpack_require__(/*! ./lib/players */ \"./lib/players.js\");\nfunction validateLogin() {\n    var usernameInput = document.getElementById(\"username1\" //html id of username 1\n    );\n    var passwordInput = document.getElementById(\"password1\");\n    if (usernameInput && passwordInput) {\n        var username = usernameInput.value;\n        var password = passwordInput.value;\n        var playerUser = (0, players_1.findUser)(username);\n        if (password == playerUser.password) {\n            (0, players_1.setUserName)(1, username);\n            console.log(\"Success!\");\n        }\n    }\n}\nfunction validateLogin2() {\n    var usernameInput = document.getElementById(\"username2\" //html id of username 2\n    );\n    var passwordInput = document.getElementById(\"password2\");\n    if (usernameInput && passwordInput) {\n        var username = usernameInput.value;\n        var password = passwordInput.value;\n        var playerUser = (0, players_1.findUser)(username);\n        if (password == playerUser.password) {\n            (0, players_1.setUserName)(2, username);\n            console.log(\"Success!\");\n        }\n    }\n}\nfunction validateUserCreation() {\n    var usernameInput = document.getElementById(\"newUsername\" //html id of username 1\n    );\n    var passwordInput = document.getElementById(\"passwordForNewUser\");\n    var retypePassword = document.getElementById(\"retypePassword\");\n    if (usernameInput && passwordInput && retypePassword) {\n        var username = usernameInput.value;\n        var password = passwordInput.value;\n        var passwordConfirmation = retypePassword.value;\n        var userCheck = (0, players_1.findUser)(username);\n        if (userCheck.userName == \"\" && password == passwordConfirmation) {\n            (0, players_1.makeNewUser)(username, password);\n        }\n    }\n}\nvar loginButton = document.getElementById(\"loginButton1\");\nvar loginButton2 = document.getElementById(\"loginButton2\");\nvar createUserButton = document.getElementById(\"createUser\");\nif (loginButton !== null) {\n    loginButton.addEventListener(\"click\", validateLogin);\n}\nif (loginButton2) {\n    loginButton2.addEventListener(\"click\", validateLogin2);\n}\nif (createUserButton) {\n    createUserButton.addEventListener(\"click\", validateUserCreation);\n}\n\n\n//# sourceURL=webpack:///./login.js?");

/***/ }),

/***/ "?d87b":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///fs_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./login.js");
/******/ 	
/******/ })()
;