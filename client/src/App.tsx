import axios from "axios";
import React, { useEffect, useRef, useReducer, useState } from "react";
import FullRow from "./components/FullRow";
import reducer from "./helpers/GameLogic";
import { isValidLetter } from "./helpers/GameLogic";

function App() {
  const [state, dispach] = useReducer(reducer, {
    current: 0,
    guess: "",
    toCheck: false,
  });
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
        dispach({ type: "delete" });
        return;
      case "Escape":
        console.log("deal later with escape--->", event.key);
        return;
      default:
        if (!isValidLetter(event.key)) {
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
      if (answer.status == 200) {
        dispach({ dataFromServer: answer.data, type: "answer-success" });
        return;
      }
      dispach({ dataFromServer: answer.data, type: "answer-fail" });
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
