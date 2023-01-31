import React, { useState, useEffect } from "react";
import styled from "styled-components";
const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  background-color: #3498db;
  text-align: center;
  position: relative;
  position: fixed;
  top: 0;
  h1 {
    font-size: 12px;
    color: #fff;
    line-height: 23px;
    text-transform: uppercase;
    font-weight: 32;
  }
  button {
    appearance: none;
    background-color: #ffffff;
    border-radius: 40em;
    border-style: none;
    box-shadow: #adcfff 0 -12px 6px inset;
    box-sizing: border-box;
    color: #000000;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.24px;
    margin: 0;
    outline: none;
    padding: 1rem 1.3rem;
    quotes: auto;
    text-align: center;
    text-decoration: none;
    transition: all 0.15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
`;
const HelpWindow = styled.div`
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: #f1f7f8;
  padding: 6rem;
  margin-top: 20px;
  border-radius: 8.8px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
  button {
    position: absolute;
    top: 1.2rem;
    right: 2rem;
    font-size: 1.8rem;
    color: #333;
    cursor: pointer;
    border: 4px solid black;
    border-radius: 4.5px;
    background: -webkit-linear-gradient(
      top,
      #f9f9f9 0%,
      #d2d2d2 80%,
      #c0c0c0 100%
    );
  }
  h1 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.1rem;
  }
  li {
    font-size: 1.1rem;
  }
`;

export default function Header() {
  const [ClickedForHelp, SetClickedForHelp] = useState(false);

  function OpenHelp() {
    SetClickedForHelp(true);
  }
  function CloseHelp() {
    SetClickedForHelp(false);
  }

  function keyboardHandlerModal(event: any) {
    if (event.key === "Escape") CloseHelp();
  }

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandlerModal);
    return () => {
      window.removeEventListener("keydown", keyboardHandlerModal);
    };
  }, [ClickedForHelp]);

  return (
    <div>
      <HeaderWrapper>
        <h1>
          <strong>Welcome To My Woordle Game!</strong>
        </h1>
        <button onClick={OpenHelp}>Help</button>
      </HeaderWrapper>
      {ClickedForHelp && <ModalPopUp CloseHelp={CloseHelp} />}
    </div>
  );
}

export function ModalPopUp(props: any) {
  return (
    <HelpWindow>
      <button onClick={props.CloseHelp}>close</button>
      <h1>Woordle: How To Play </h1>
      <p>
        Wordle, the online word game is very easy to play and has very simple
        rules that one can go through.
      </p>
      <ul>
        <li>The player has to guess the Wordle in six attempts or less</li>
        <li>Every word, which is entered should be in the word list</li>
        <li>If the letter is correct, the color would turn green</li>
        <li>
          If the letter is correct but placed wrong then it would turn yellow
        </li>
        <li>An incorrect letter turns gray</li>
        <li>Letters can be used more than one time</li>
      </ul>
    </HelpWindow>
  );
}
