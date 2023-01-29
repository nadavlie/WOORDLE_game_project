import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";

function App() {
  const [WordToGuess, setWordToGuess] = useState("shalomi");
  const [cnt, setcnt] = useState<number>(0);
  let me: any;

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWordToGuess(JSON.stringify(data));
      })
      .catch(error => {
        console.log("errrorrr", error);
      });
  }, []);

  function submitHandler() {
    setcnt(prev => prev + 1);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type={"text"} />
        <input type={"submit"} />
      </form>
      <h1>{cnt}</h1>
      <h1>{WordToGuess}</h1>
    </div>
  );
}

export default App;
