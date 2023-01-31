import * as Type from "./Types";
import axios from "axios";
import App from "../App";

const reducer = (prev: Type.State, action: Type.Action): Type.State => {
  switch (action.type) {
    case "add":
      return { ...prev, guess: prev.guess + action.letter };
    case "delete":
      return { ...prev, guess: prev.guess.slice(0, -1) };
    case "addBeforeCheck":
      return { ...prev, guess: prev.guess + action.letter };
    case "check":
      return { ...prev, toCheck: true };
    case "response:invalid-word":
      return { ...prev, guess: "", toCheck: false };
    case "response:success":
      return {
        ...prev,
        toCheck: false,
        guess: "",
        styles: [...prev.styles, action.dataFromServer],
        try: (prev.try as number) + 1,
        colorsMap: MapUpdaterHelper(prev.colorsMap, [
          ...prev.styles,
          action.dataFromServer,
        ]),
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
  colorsMap: new Map(),
};

const MapUpdaterHelper = (
  lastMap: Map<string, string>,
  lastStyles: [...Type.Style[]]
) => {
  let a = lastMap;
  for (let each of lastStyles) {
    for (let i = 0; i < 5; i++) {
      let letter = Object.keys(each)[0][i];
      let color = Object.values(each)[0][i];
      if (a.get(letter) === "green") {
        continue;
      } else {
        a.set(letter.toUpperCase(), color);
      }
    }
  }
  return a;
};
