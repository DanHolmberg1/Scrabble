"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.saveUsers = exports.userArrayToJson = exports.jsonToUserArray = void 0;
/**
 * Takes a string of an array in JSON format that also has Users in JSON format
 * and converts it into an array of Users.
 * @param {string} jsonString - string in JSON to be converted.
 * @invariant jsonString must be an array in JSON format.
 * @returns {Array<User>} - Returns an array of Users
 */
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
exports.jsonToUserArray = jsonToUserArray;
/**
 * Takes an array of Users and converts it into an array of Users in JSON format,
 * then converts the entire array into JSON format and returns it.
 * @param {Array<User>} userArray - The array of Users to be converted
 * @returns {string} - Returns a string which is an array in JSON format.
 */
function userArrayToJson(userArray) {
    var tempArray = [];
    userArray.forEach(function (x) {
        var currentIndex = userArray.indexOf(x);
        tempArray[currentIndex] = JSON.stringify(x);
    });
    return JSON.stringify(tempArray);
}
exports.userArrayToJson = userArrayToJson;
/**
 * Saves the given array of Users to localStorage with key "UserData" in JSON format.
 * @param {Array<User>} userArray - The array of Users to be saved
 */
function saveUsers(userArray) {
    localStorage.setItem("UserData", userArrayToJson(userArray));
}
exports.saveUsers = saveUsers;
/**
 * Returns the Array of Users saved in localStorage with key "UserData".
 * If no data has been saved returns empty array.
 * @returns {Array<User>} - Returns Array of Users from save data
 */
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
