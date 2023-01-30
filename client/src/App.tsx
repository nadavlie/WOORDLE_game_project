import React, { useEffect, useRef, useReducer } from "react";

import FullRow from "./components/FullRow";
import reducer from "./helpers/GameLogic";
import { isValidLetter } from "./helpers/GameLogic";

function App() {
  const [state, dispach] = useReducer(reducer, { current: 0, guess: "" });
  const _WorD = useRef("");

  //getting a game word from server
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => {
        _WorD.current = data;
      })
      .catch(error => {
        console.log("errrorrr", error);
        _WorD.current = "world";
      });
  }, []);

  //KEY-PRESS HANDLER
  function KeyDownHandler(event: KeyboardEvent): void {
    if (
      !isValidLetter(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Escape"
    ) {
      alert("invalid letter typed mt friend!");
      return;
    }
    switch (event.key) {
      case "Backspace":
        dispach({ type: "delete", letter: event.key });
        return;
      case "Escape":
        console.log("deal later with escape--->", event.key);
        return;
      default:
        state.guess.length < 4
          ? dispach({ type: "add", letter: event.key })
          : dispach({ type: "check", letter: event.key });
    }
  }
  //kEYBOARDlISTENER!
  useEffect(() => {
    window.addEventListener("keydown", KeyDownHandler);
    return () => {
      window.removeEventListener("keydown", KeyDownHandler);
    };
  }, [state]);

  return (
    <div>
      <FullRow />
      <FullRow />
      <FullRow />
      <FullRow />
      <FullRow />

      <h1>zona</h1>
      <h1>{state.guess}</h1>
    </div>
  );
}

export default App;
