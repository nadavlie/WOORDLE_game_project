import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";

function App() {
  const [WordToGuess, setWordToGuess] = useState("shalomi");
  let me: any;

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWordToGuess(JSON.stringify(data));
      })
      .catch(error => {
        console.log("hhhh errrorrr", error);
      });
  }, []);

  return <h1>{WordToGuess}</h1>;
}

export default App;
