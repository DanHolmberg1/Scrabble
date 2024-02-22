import * as q from "./queue_array";

export function generateRandomLetters(): q.Queue<string> {
  const letters = [
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "B",
    "B",
    "C",
    "D",
    "D",
    "D",
    "D",
    "D",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "G",
    "H",
    "H",
    "I",
    "I",
    "I",
    "I",
    "I",
    "J",
    "K",
    "K",
    "K",
    "L",
    "L",
    "L",
    "L",
    "L",
    "M",
    "M",
    "M",
    "N",
    "N",
    "N",
    "N",
    "N",
    "O",
    "O",
    "O",
    "O",
    "O",
    "P",
    "P",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "S",
    "S",
    "S",
    "S",
    "S",
    "S",
    "S",
    "S",
    "T",
    "T",
    "T",
    "T",
    "T",
    "T",
    "T",
    "T",
    "U",
    "U",
    "U",
    "V",
    "V",
    "X",
    "Y",
    "Z",
    "Å",
    "Å",
    "Ä",
    "Ä",
    "Ö",
    "Ö",
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
