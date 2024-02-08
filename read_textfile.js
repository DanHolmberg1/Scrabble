const fs = require("fs");
const readline = require("readline");

const filePath = "Collins Scrabble Words (2019).txt";
const rows = [];

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity, // To handle both Unix and Windows line endings
});

rl.on("line", (line) => {
  // Each line is pushed to the 'rows' array
  rows.push(line);
});

rl.on("close", () => {
  // All lines have been read
  let cnt = 0;
  for (let i of rows) {
    if (i.length >= 10) {
      cnt++;
    }
  }
  console.log(cnt);
  // You can now process the 'rows' array as needed
});
