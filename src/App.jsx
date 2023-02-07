import React from "react";
import Die from "./Die";

import "./App.css";

export default function App() {
  const [dice, setDice] = React.useState(newDice());
  function newDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.floor(Math.random() * 6 + 1));
    }
    return diceArray;
  }
  function rollDice() {
    setDice(newDice());
  }
  const diceElements = dice.map((die) => <Die value={die} />);
  return (
    <main>
      <div className="explanation">
        <h1>Tenzies</h1>
        <p>
          Roll untill all dice are the same. Click each die to freeze it at its
          current value betwen rolls.
        </p>
      </div>
      <div className="dice">{diceElements}</div>
      {<button onClick={rollDice}>Roll</button>}
    </main>
  );
}
