"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.saveUsers = void 0;
var fs = require("fs");
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
    fs.writeFile('./users.txt', userArrayToJson(userArray), function (err) {
        if (err) {
            throw err;
        }
    });
}
exports.saveUsers = saveUsers;
function getUsers() {
    var tempString = "";
    fs.readFile('./users.txt', function (err, data) {
        if (err)
            throw err;
        tempString = data.toString();
    });
    return jsonToUserArray(tempString);
}
exports.getUsers = getUsers;
/*
fs.readFile('./users.txt', (err, data) => {
    if (err) throw err;
    let tempString: string = data.toString();
    console.log(tempString);
    
});


fs.writeFile('./users.txt', "testarmeragrejernu", function(err){
    if (err) {
        throw err
    }
});
*/
