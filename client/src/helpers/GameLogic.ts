import * as Type from "./Types";
import axios from "axios";

const reducer = (prev: Type.State, action: Type.Action): Type.State => {
  switch (action.type) {
    case "add":
      return { ...prev, guess: prev.guess + action.letter };
    case "delete":
      return { ...prev, guess: prev.guess.slice(0, -1) };
    case "addAndCheck":
      return { ...prev, guess: prev.guess + action.letter, toCheck: true };
    case "response:invalid-word":
      return { ...prev, guess: "", toCheck: false };
    case "response:success":
      return {
        toCheck: false,
        guess: "",
        styles: [...prev.styles, action.dataFromServer],
        try: (prev.try as number) + 1,
      };
    case "fail":
      throw new Error("somthing went wrong with the server...");
  }
};
export default reducer;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//checks validity of the letter
const QWERTY = `QWERTYUIOPASDFGHJKLZXCVBNM`.split("").concat(["del"]);
export function isValidLetter(letter: string): boolean {
  return QWERTY.includes(letter.toUpperCase());
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const initalState = {
  guess: "",
  toCheck: false,
  styles: [],
  try: 0,
};
