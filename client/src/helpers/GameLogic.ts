import * as Type from "./Types";
import axios from "axios";

// const reducer=(prev:Type.State,action:Type.Action):any{

const reducer = (prev: Type.State, action: Type.Action): Type.State => {
  if (action.type === "add") {
    return { ...prev, guess: prev.guess + action.letter };
  }
  if (action.type === "delete") {
    if (prev.guess.length > 0 && prev.guess.length < 5) {
      return { ...prev, guess: prev.guess.slice(0, -1) };
    }
    return prev;
  }

  if (action.type === "check") {
    let a = sendingToServer();

    async function sendingToServer() {
      try {
        return await axios
          .post("http://localhost:3001/", {
            wordToCheck: prev.guess + action.letter,
          })
          .then(e => {
            console.log("awaiting!!");
            return e;
          });
      } catch (err) {
        throw new Error("loves");
      }
    }
    setTimeout(() => {
      setTimeout(() => {
        let b = a.then(whatshere => whatshere.data) as any;

        console.log({ ...prev, guess: b }, "cigi");
      }, 1000);
    }, 600);
  }
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
