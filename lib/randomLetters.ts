import * as q from "./queue_array";

export function generateRandomLetters(): q.Queue<string> {
  const letters = [
"E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
"A", "A", "A", "A", "A", "A", "A", "A", "A",
"I", "I", "I", "I", "I", "I", "I", "I", "I",
"O", "O", "O", "O", "O", "O", "O", "O", "N", "N", "N", "N", "N", "N",
"R", "R", "R", "R", "R", "R",
"T", "T", "T", "T", "T", "T", "L", "L", "L", "L", "S", "S", "S", "S",
"U", "U", "U", "U", "D", "D", "D", "D", "G", "G", "G", "B", "B", "C", "C", "M", "M", "P", "P", "F", "F",
"H", "H", "V", "V", "W", "W", "Y", "Y", "K", "J", "X", "Q", "Z",

  ];

  let randomLetters: q.Queue<string> = q.empty();
  let lettersScrambled = shuffle(letters);
  for (let i = 0; i < lettersScrambled.length; i++) {
    q.enqueue(lettersScrambled[i], randomLetters);
  }
  return randomLetters;
}

function shuffle(array: Array<string>): Array<string> {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
