import * as Type from "./Types";
import axios from "axios";

const reducer = (prev: Type.State, action: Type.Action): Type.State => {
  switch (action.type) {
    case "add":
      return { ...prev, guess: prev.guess + action.letter };
    case "delete":
      if (prev.guess.length > 0 && prev.guess.length < 5) {
        return { ...prev, guess: prev.guess.slice(0, -1) };
      } else {
        return { ...prev };
      }
    case "addAndCheck":
      return { ...prev, guess: prev.guess + action.letter, toCheck: true };
    case "answer-success":
      console.log(action.dataFromServer);
      return { ...prev, toCheck: false };
  }
  console.log("non of the above in reducer logic");
  return { ...prev };
};
export default reducer;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//checks validity of the letter
const QWERTY = `QWERTYUIOPASDFGHJKLZXCVBNM`.split("").concat(["del"]);
export function isValidLetter(letter: string): boolean {
  return QWERTY.includes(letter.toUpperCase());
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
