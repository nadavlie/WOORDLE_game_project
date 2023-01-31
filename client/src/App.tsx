import axios from "axios";

import React, { useEffect, useRef, useReducer, useState } from "react";
import FullRow from "./components/FullRow";
import * as Logic from "./helpers/GameLogic";
import Header from "./components/Header";
import KeyBoard from "./components/KeyBoard";

function App() {
  const [state, dispach] = useReducer(Logic.default, Logic.initalState);
  const _WorD = useRef("");

  console.log("state.styles", state);

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
  function KeyDownHandler(letter: any): void {
    letter = letter.key || letter;
    switch (letter) {
      case "Backspace":
        if (state.guess.length > 0 && state.guess.length !== 5) {
          dispach({ type: "delete" });
          return;
        }
        return;
      default:
        if (!Logic.isValidLetter(letter)) {
          alert("invalid letter typed mt friend!");
          return;
        } else if (state.guess.length < 4) {
          dispach({ type: "add", letter: letter });
          return;
        }
    }
    //if we got here -->  it means needs to check the word!
    dispach({ letter: letter, type: "addAndCheck" });
  }
  useEffect(() => {
    const callServer = async () => {
      let answer = await axios.post("http://localhost:3001/", {
        wordToCheck: state.guess,
      });

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

  // function OnVirtualKeyPress(letter?: string) {
  //   if (state.guess.length < 4 && letter) {
  //     dispach({ type: "add", letter: letter });
  //   } else if (state.guess.length > 0 && state.guess.length !== 5) {
  //     dispach({ type: "delete" });
  //   }
  // }

  return (
    <div>
      {/*  <Header />*/}
      <FullRow
        toDisplay={{
          active: state.try === 0,
          input: state.guess,
          style: state.styles[0],
        }}
      />
      <FullRow
        toDisplay={{
          active: state.try === 1,
          input: state.guess,
          style: state.styles[1],
        }}
      />
      <FullRow
        toDisplay={{
          active: state.try === 2,
          input: state.guess,
          style: state.styles[2],
        }}
      />
      <FullRow
        toDisplay={{
          active: state.try === 3,
          input: state.guess,
          style: state.styles[3],
        }}
      />
      <FullRow
        toDisplay={{
          active: state.try === 4,
          input: state.guess,
          style: state.styles[4],
        }}
      />

      <KeyBoard OnVirtualKeyPress={KeyDownHandler} />
    </div>
  );
}

export default App;
