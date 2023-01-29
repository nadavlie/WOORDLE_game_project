import React, { useEffect, useState, useReducer } from "react";
import { json } from "stream/consumers";
import FullRow from "./components/FullRow";

function App() {
  const [WordToGuess, setWordToGuess] = useState("");
  const [cnt, setcnt] = useState<number>(0);
  //const [state, dispath] = useReducer();

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWordToGuess(JSON.stringify(data));
      })
      .catch(error => {
        setWordToGuess("world");
        console.log("errrorrr", error);
      });
  }, []);

  function submitHandler() {
    setcnt(prev => prev + 1);
  }

  return (
    <div>
      <FullRow />
      <h1>{cnt}</h1>
      <h1>{WordToGuess}</h1>
    </div>
  );
}

export default App;
