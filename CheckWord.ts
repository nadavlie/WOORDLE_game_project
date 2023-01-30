import AllValidWords from "./server-data/data";
export default function CheckWord(
  GameWord: string,
  userGuess: string
): string[] | string {
  if (!AllValidWords.includes(userGuess.toLocaleLowerCase())) {
    return "invalid-word";
  }
  const placeHolder = GameWord.split("");
  let results: string[] = [];

  for (let w = 0; w < 5; w++) {
    if (userGuess[w] === placeHolder[w]) {
      placeHolder[w] = "!";
      results.push("green");
    } else if (placeHolder.includes(userGuess[w])) {
      placeHolder[GameWord.indexOf(userGuess[w])] = "!";
      results.push("yellow");
    } else {
      results.push("gray");
    }
  }
  return results;
}
