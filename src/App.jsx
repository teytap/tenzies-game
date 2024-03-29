import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./App.css";

export default function App() {
  const [dice, setDice] = React.useState(newDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [bestCount, setBestCount] = React.useState(
    JSON.parse(localStorage.getItem("bestcount")) || 0
  );
  //---time and best time definitions---
  const [time, setTime] = React.useState(Date.now());
  const [start, setStart] = React.useState(Date.now());
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("besttime")) || Infinity
  );

  let passedTime = Infinity;
  if (start < time) {
    passedTime = Math.round((time - start) / 1000);
  }

  React.useEffect(() => {
    // ---if every die isHeld and all the values are same game is won---
    const allHeld = dice.every((die) => die.isHeld);
    //---every checks each---
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      setTime(Date.now());

      //--- best count---
      if (count < bestCount || bestCount === 0) {
        localStorage.setItem("bestcount", count);
        setBestCount(count);
      }
      //---best time---
      if (passedTime < bestTime || bestTime === 0) {
        setBestTime(passedTime);
        localStorage.setItem("besttime", passedTime.toString());
      }
    }
  }, [dice, passedTime, bestTime]);

  function newDice() {
    //---generates dice array of 6 objects with die properties---
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
    //---to count how many rolls at win!---
    setCount(count + 1);

    //---when game finished if condition helps to start new game---
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.floor(Math.random() * 6),
                isHeld: false,
                //---nanoid component generates id for key---
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(newDice());
      setCount(1);
      setStart(Date.now());
    }
  }

  //---when die values are clicked function helps to hold/unhold and save---
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  //---this map takes dice elements and maps as die component with its own props---
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {/* ---confetti starts when game is won--- */}
      {tenzies === true && <Confetti />}
      <div className="explanation">
        <h1>Tenzies</h1>

        {/* ---changes instruction to you won! when game is won--- */}
        {tenzies === true ? (
          <div>
            <h2 className="message">
              {bestCount >= count || bestTime >= passedTime
                ? "High score!"
                : "You won!"}
            </h2>
            ⏱ In <span className="score">{count}</span> rolls and in{" "}
            <span className="score">{passedTime}</span> seconds!{" "}
            {/* ---conditional rendering:if bestCount exists show the sentence--- */}
            {bestCount !== 0 && (
              <div>
                🏆 Best score is in{" "}
                <span className="best--score">{bestCount}</span> rolls, in
                <span className="best--score"> {bestTime}</span> seconds!
              </div>
            )}
          </div>
        ) : (
          `Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.`
        )}
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
