import axios from "axios";
import { type } from "os";
import React, { useEffect, useRef, useReducer, useState } from "react";
import FullRow from "./components/FullRow";
import * as Logic from "./helpers/GameLogic";

function App() {
  const [state, dispach] = useReducer(Logic.default, Logic.initalState);
  const _WorD = useRef("");

  //getting a game word from server a first app mount!
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
  //getting a game word from server a first app mount!

  //KEY-PRESS HANDLER
  function KeyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case "Backspace":
        if (state.guess.length > 0 && state.guess.length !== 5) {
          dispach({ type: "delete" });
          return;
        }
        return;
      case "Escape":
        console.log("deal later with escape--->", event.key);
        return;
      default:
        if (!Logic.isValidLetter(event.key)) {
          alert("invalid letter typed mt friend!");
          return;
        } else if (state.guess.length < 4) {
          dispach({ type: "add", letter: event.key });
          return;
        }
    }
    //if we got here -->  it means needs to check the word!
    dispach({ letter: event.key, type: "addAndCheck" });
  }
  useEffect(() => {
    const callServer = async () => {
      let answer = await axios.post("http://localhost:3001/", {
        wordToCheck: state.guess,
      });
      console.log(answer.data === "invalid-word");
      if (answer.status == 200) {
        if (answer.data === "invalid-word") {
          dispach({ type: "response:invalid-word" });
          return;
        } else {
          let key = state.guess;
          let value = answer.data;
          let payload = { [key]: value };
          dispach({ type: "response:success", dataFromServer: payload });
          return;
        }
      } else {
        dispach({ type: "fail" });
      }
    };
    if (state.toCheck) {
      callServer();
    }
  });

  //kEYBOARDlISTENER!
  useEffect(() => {
    window.addEventListener("keydown", KeyDownHandler);
    return () => {
      window.removeEventListener("keydown", KeyDownHandler);
    };
  }, [state]);

  return (
    <div>
      <FullRow
        toDisplay={state.styles[0] || (state.try === 0 ? state.guess : "")}
      />
      <FullRow
        toDisplay={state.styles[1] || (state.try === 1 ? state.guess : "")}
      />
      <FullRow
        toDisplay={state.styles[2] || (state.try === 2 ? state.guess : "")}
      />
      <FullRow
        toDisplay={state.styles[3] || (state.try === 3 ? state.guess : "")}
      />
      <FullRow
        toDisplay={state.styles[4] || (state.try === 4 ? state.guess : "")}
      />

      <h1>zona</h1>
      <h1>{state.guess}</h1>
    </div>
  );
}

export default App;
