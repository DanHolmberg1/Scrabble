/**
 * User is used as personal accounts of users of the program. Is accessed with 
 * username and password and stores highscore.
 */
export type User = {
    userName: string;
    password: string;
    highScore: number;
  };


/**
 * Takes a string of an array in JSON format that also has Users in JSON format
 * and converts it into an array of Users.
 * @param {string} jsonString - string in JSON to be converted. 
 * @invariant jsonString must be an array in JSON format.
 * @returns {Array<User>} - Returns an array of Users
 */
export function jsonToUserArray(jsonString: string): Array<User> {
    let tempJson: Array<string> = JSON.parse(jsonString);
    let newArray: Array<User> = [];
    tempJson.forEach(x  => {
        let newElement: User = JSON.parse(x);
        let currentIndex: number = tempJson.indexOf(x);
        newArray[currentIndex] = newElement;
    });
    return newArray;
}

/**
 * Takes an array of Users and converts it into an array of Users in JSON format,
 * then converts the entire array into JSON format and returns it.
 * @param {Array<User>} userArray - The array of Users to be converted 
 * @returns {string} - Returns a string which is an array in JSON format.
 */
export function userArrayToJson(userArray: Array<User>): string {
    let tempArray: Array<string> = [];
    userArray.forEach(x => {
        let currentIndex: number = userArray.indexOf(x);
        tempArray[currentIndex] = JSON.stringify(x);
    });
    return JSON.stringify(tempArray);
}

/**
 * Saves the given array of Users to localStorage with key "UserData" in JSON format.
 * @param {Array<User>} userArray - The array of Users to be saved 
 */
export function saveUsers(userArray: Array<User>): void {
    localStorage.setItem("UserData", userArrayToJson(userArray))
}
/**
 * Returns the Array of Users saved in localStorage with key "UserData". 
 * If no data has been saved returns empty array.
 * @returns {Array<User>} - Returns Array of Users from save data
 */
export function getUsers(): Array<User> {
    let tempString: string | null = localStorage.getItem("UserData");
    let emptyArray: Array<User> = []
    if (tempString === null){
        return emptyArray
    }
    else {
        return jsonToUserArray(tempString);
    }
}











