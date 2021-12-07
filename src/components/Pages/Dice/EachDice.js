import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./EachDice.css";

// this displays a single die and rolls the number displayed until the sound
// stops and then displays the outcome of the roll onto the dice

export default function Dice(props) {
  const [diceNumber, setDiceNumber] = useState(1);

  useEffect(() => {
    let count = 0;
    const moving = setInterval(() => {
      setDiceNumber(Math.floor(1 + Math.random() * 10));
      if (count > 180) {
        clearInterval(moving);
        setDiceNumber(props.dice);
      }
      count++;
    }, 10);
  }, [props.dice]);

  return (
    <div id="box">
      {diceNumber}
    </div>
  );
}
