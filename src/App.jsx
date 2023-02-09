import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./App.css";

export default function App() {
  const [dice, setDice] = React.useState(newDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    // if every die isHeld and all the values are same game is won
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function newDice() {
    //generates dice array of 6 objects with die properties
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArray;
  }

  function rollDice() {
    //to count how many rolls at win!
    setCount(count + 1);
    console.log(count);
    //when game finished if condition helps to start new game
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.floor(Math.random() * 6),
                isHeld: false,
                //nanoid component generates id for key
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(newDice());
    }
  }

  function holdDice(id) {
    //when die values are clicked function helps to hold/unhold and save
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  //this map takes dice elements and maps as die component with its own props
  const diceElements = dice.map((die) => (
    <Die
      key={die.key}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main>
      {/* confetti starts when game is won */}
      {tenzies === true && <Confetti />}
      <div className="explanation">
        <h1>Tenzies</h1>
        <p>
          {/* changes instruction to you won! when game is won */}
          {tenzies === true
            ? `You won in ${count} rolls!`
            : `Roll untill all dice are the same. Click each die to freeze it at its current value betwen rolls.`}
        </p>
      </div>
      <div className="dice">{diceElements}</div>
      {
        <button onClick={rollDice}>
          {/* changes buttons value to New game when game is won*/}
          {tenzies === true ? "New Game" : "Roll"}
        </button>
      }
    </main>
  );
}
