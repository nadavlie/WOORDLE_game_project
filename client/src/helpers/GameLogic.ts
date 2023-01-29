import * as Type from "./Types";
import axios from "axios";
const QWERTY = `QWERTYUIOPASDFGHJKLZXCVBNM`.split("").concat(["del"]);

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
    (async () => {
      let answer = await axios
        .post("http://localhost:3001/checkword", {
          wordToCheck: prev.guess + action.letter,
        })
        .then(cheked => alert(cheked))
        .catch(err => {
          console.error("my bad!", err);
        });
      console.log("emeergennccy!", answer);
      return prev;
    })();
    return prev;
  }
  return prev;
};
export default reducer;

export function isValidLetter(letter: string): boolean {
  return QWERTY.includes(letter.toUpperCase());
}

// const response = axios({
//   method: 'get',
//   url: 'https://api.example.com/data',
//   async: false
// });

// console.log(response.data);

// const reducer = (state: State, action: SETSTATE) => {
//   if (action.type === "AddLetter") {
//     return { ...state, row1: state.row1 + action.value };
//   } else {
//     if (action.type === "ChekWord") {
//       if (UserInputCheck(state.row1 + action.value)) {
//         console.log("valid word!");
//       } else {
//         console.log("bad word");
//       }
//       return { ...state, row1: state.row1 + action.value };
//     }
//     return { ...state };
//   }
//   //todo:delete this please!
// };

// function UserInputCheck(word: string) {
//   //chakes if it is a valid word!
//   console.log(`checking this word: ${word}`);
//   return WORDS.find(item => item === word);
// }

// export default reducer;
