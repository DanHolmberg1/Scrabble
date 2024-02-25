import * as fs from 'fs'

type User = {
    userName: string;
    password: string;
    highScore: number;
  };

// npm install -D @types/node

//fs.readFileSync('users.txt', 'utf8');

function jsonToUserArray(jsonString: string): Array<User> {
    let tempJson: Array<string> = JSON.parse(jsonString);
    let newArray: Array<User> = [];
    tempJson.forEach(x  => {
        let newElement: User = JSON.parse(x);
        let currentIndex: number = tempJson.indexOf(x);
        newArray[currentIndex] = newElement;
    });
    return newArray;
}

function userArrayToJson(userArray: Array<User>): string {
    let tempArray: Array<string> = [];
    userArray.forEach(x => {
        let currentIndex: number = userArray.indexOf(x);
        tempArray[currentIndex] = JSON.stringify(x);
    });
    return JSON.stringify(tempArray);
}

export function saveUsers(userArray: Array<User>): void {
    fs.writeFile('./users.txt', userArrayToJson(userArray), function(err){
        if (err) {
            throw err
        }
    });
}

export function getUsers(): Array<User> {
    let tempString: string = ""
    fs.readFile('./users.txt', (err, data) => {
        if (err) throw err;
        tempString = data.toString();
    });
    return jsonToUserArray(tempString);
}


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






