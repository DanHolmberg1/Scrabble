export type User = {
    userName: string;
    password: string;
    highScore: number;
  };

// npm install -D @types/node

//fs.readFileSync('users.txt', 'utf8');

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

export function userArrayToJson(userArray: Array<User>): string {
    let tempArray: Array<string> = [];
    userArray.forEach(x => {
        let currentIndex: number = userArray.indexOf(x);
        tempArray[currentIndex] = JSON.stringify(x);
    });
    return JSON.stringify(tempArray);
}

export function saveUsers(userArray: Array<User>): void {
    localStorage.setItem("UserData", userArrayToJson(userArray))
}

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








