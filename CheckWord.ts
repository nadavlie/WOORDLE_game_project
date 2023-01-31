import AllValidWords from "./server-data/data";
export default function CheckWord(
  GameWord: string,
  userGuess: string
): string[] | string {
  if (!AllValidWords.includes(userGuess.toLocaleLowerCase())) {
    return "invalid-word";
  }
  let a = GameWord;
  let b = a.split("");
  let results = [];
  for (let w = 0; w < 5; w++) {
    if (userGuess[w] === b[w]) {
      b[w] = "!";
      results.push("green");
    } else if (b.includes(userGuess[w])) {
      b[a.indexOf(userGuess[w])] = "!";
      results.push("yellow");
    } else {
      results.push("gray");
    }
  }
  return results;
}
