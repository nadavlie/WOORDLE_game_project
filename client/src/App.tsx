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
  console.log(colorMap);

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
      case "Enter":
        console.log("entered enter");
        return BtnSubmitHandler();

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
    dispach({ letter: letter, type: "addBeforeCheck" });
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
          dispach({
            type: "response:success",
            dataFromServer: payload,
          });
          return;
        }
      } else {
        dispach({ type: "fail" });
      }
    };
    if (state.toCheck) {
      callServer();
    }

    //ADDING MAP-COLOR FOR KEYBOARD COLORS!
    //ADDING MAP-COLOR FOR KEYBOARD COLORS!
    //ADDING MAP-COLOR FOR KEYBOARD COLORS!
  });

  if (state.win) {
    setTimeout(() => {
      alert("you WON! you little Woordlist!");
    }, 200);
  }

  //kEYBOARDlISTENER
  useEffect(() => {
    window.addEventListener("keydown", KeyDownHandler);
    return () => {
      window.removeEventListener("keydown", KeyDownHandler);
    };
  }, [state]);

  //BTN SUBMITION HANDLER!

  const BtnSubmitHandler = () => {
    console.log("btn submition! length is-->", state.guess);
    if (state.guess.length === 5) {
      dispach({ type: "check" });
    } else {
      alert("please enter a 5 letter word!");
      return;
    }
  };

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
        <Submit onClick={() => BtnSubmitHandler()}>Submit Word</Submit>

        <KeyBoard
          colorsMap={state.colorsMap}
          OnVirtualKeyPress={KeyDownHandler}
        />
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
  padding: 46px;
  border: solid 10px #3498db;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 2px #3498db;
`;

const Submit = styled.button`
  /* CSS */

  background-image: linear-gradient(#42a1ec, #0070c9);
  border: 1px solid #0077cc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  direction: ltr;
  display: block;
  font-family: "SF Pro Text", "SF Pro Icons", "AOS Icons", "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: -0.022em;
  line-height: 1.47059;
  min-width: 30px;
  overflow: visible;
  padding: 9px 19px;
  text-align: center;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;

  &:disabled {
    cursor: default;
    opacity: 0.1;
  }

  &:hover {
    background-image: linear-gradient(#51a9ee, #147bcd);
    border-color: #1482d0;
    text-decoration: none;
  }

  &:active {
    background-image: linear-gradient(#3d94d9, #0067b9);
    border-color: #006dbc;
    outline: none;
  }

  &:focus {
    box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
    outline: none;
  }
`;

export default App;
