"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.saveUsers = void 0;
// npm install -D @types/node
//fs.readFileSync('users.txt', 'utf8');
function jsonToUserArray(jsonString) {
    var tempJson = JSON.parse(jsonString);
    var newArray = [];
    tempJson.forEach(function (x) {
        var newElement = JSON.parse(x);
        var currentIndex = tempJson.indexOf(x);
        newArray[currentIndex] = newElement;
    });
    return newArray;
}
function userArrayToJson(userArray) {
    var tempArray = [];
    userArray.forEach(function (x) {
        var currentIndex = userArray.indexOf(x);
        tempArray[currentIndex] = JSON.stringify(x);
    });
    return JSON.stringify(tempArray);
}
function saveUsers(userArray) {
    localStorage.setItem("UserData", userArrayToJson(userArray));
}
exports.saveUsers = saveUsers;
function getUsers() {
    var tempString = localStorage.getItem("UserData");
    var emptyArray = [];
    if (tempString === null) {
        return emptyArray;
    }
    else {
        return jsonToUserArray(tempString);
    }
}
exports.getUsers = getUsers;
function loadUser() {
    fetch("lib/users.txt");
}
/*
function testing(): void {
    
    fs.readFile('./users.txt', (err, data) => {
        if (err) throw err;
        tempString.push(data.toString());
    });
 
}

let tempString2: string = ""

fetch("/users.txt")
  .then((response) => response.text())
  .then((data) => {
    // Split the data into an array using line breaks
    const dataArray = data.toString();
    tempString2 = dataArray;
  })
  .catch((error) => console.error("Error reading the file:", error));



fs.writeFile('./users.txt', "testarmeragrejernu", function(err){
    if (err) {
        throw err
    }
});

let testingArray: Array<User> = [];

const user1: User = {userName: "Anton", password: "ost123", highScore: 700}
const user2: User = {userName: "David", password: "tomater", highScore: 500}

testingArray[0] = user1;
testingArray[1] = user2;

saveUsers(testingArray);
*/
//console.log(tempString2);
