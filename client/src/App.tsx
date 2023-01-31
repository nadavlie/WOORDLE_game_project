import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useRef, useReducer, useState } from "react";
import FullRow from "./components/FullRow";
import * as Logic from "./helpers/GameLogic";
import Header from "./components/Header";
import KeyBoard from "./components/KeyBoard";

function App() {
  const [state, dispach] = useReducer(Logic.default, Logic.initalState);
  const _WorD = useRef("");
  const [colorMap, setcolorMap] = useState(new Map());

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

  //KEY-PRESS HANDLER FUNCTION
  function KeyDownHandler(keyStroke: any): void {
    let letter: any = keyStroke;
    if (keyStroke.key) {
      letter = keyStroke.key;
    }
    switch (letter) {
      case "del":
        if (state.guess.length > 0 && state.guess.length !== 5) {
          dispach({ type: "delete" });
        }
        return;
      case "Backspace":
        if (state.guess.length > 0 && state.guess.length !== 5) {
          dispach({ type: "delete" });
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

  //HERE-->HANDELING FETCHING RESPONSE FROM SERVER AND COLOR-MAP UPDATING!
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
    let a = colorMap;
    for (let each of state.styles) {
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
    setcolorMap(a);
    //ADDING MAP-COLOR FOR KEYBOARD COLORS!
    //ADDING MAP-COLOR FOR KEYBOARD COLORS!
    //ADDING MAP-COLOR FOR KEYBOARD COLORS!
  });

  //kEYBOARDlISTENER
  useEffect(() => {
    window.addEventListener("keydown", KeyDownHandler);
    return () => {
      window.removeEventListener("keydown", KeyDownHandler);
    };
  }, [state]);

  //RETURN STATMENT-->

  return (
    <div>
      <Header />
      <Div>
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

        <KeyBoard colorsMap={colorMap} OnVirtualKeyPress={KeyDownHandler} />
      </Div>
    </div>
  );
}

const Div = styled.div`
  display: grid;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-items: center;
`;

export default App;
