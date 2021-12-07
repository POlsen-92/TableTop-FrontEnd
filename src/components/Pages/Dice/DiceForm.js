import React, { useState, useEffect } from "react";
import "./DiceForm.css";
import { DiceRoll } from "rpg-dice-roller";
import Dice from "./EachDice";
import useSound from "use-sound";
import rollSound from "./diceSound.mp3";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [updateFormState, setUpdateFormState] = useState("");
  const [showOptionQuantity, setShowOptionQuantity] = useState(false);
  const [rollTotal, setRollTotal] = useState("");
  const [play] = useSound(rollSound);

  // hide further option if none radio button is chosen

  const handleRadio = (e) => {
    if (e.target.value === "none") {
      setShowOptionQuantity(false);
    } else {
      setShowOptionQuantity(true);
    }
  };

  // listens for form submit then builds proper string to use
  // rpg-dice-roller based off of form answers
  // additionally sets a random number to rollTotal to appear like dice rolling

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let option = "";
    if (e.target[2].checked) {
      option = "";
      e.target[5].value = "";
    }
    if (e.target[3].checked) {
      option = "min";
    }
    if (e.target[4].checked) {
      option = "max";
    }
    const roll1 = new DiceRoll(
      e.target[0].value + "d" + e.target[1].value + option + e.target[5].value
    );
    setUpdateFormState(roll1);
    let count = 0;
    const moving = setInterval(() => {
      setRollTotal(Math.floor(1 + Math.random() * 10));
      if (count > 480) {
        clearInterval(moving);
        setRollTotal(roll1.total);
      }
      count++;
    })
  };

  // resets form

  const clear = () => {
    setUpdateFormState("");
    setRollTotal("");
  };

  // changes the string of information returned from rpg-dice-roller
  // into usable numbers

  const test = () => {
    if (updateFormState) {
      return updateFormState.output
        .split("[")
        .pop()
        .split("]")[0]
        .split(",")
        .map(function (item) {
          return parseInt(item, 10);
        });
    }
  };

  // places the dice rolling sound

  useEffect(() => {
    if (updateFormState) {
      play();
    }
  }, [updateFormState]);

  return (
    <div class="Container">
      
        <div class="dice">
          <ul id="list">
            {updateFormState
              ? test().map((dice, index) => {
                return (
                  <li key={index}>
                    <Dice dice={dice} />
                  </li>
                );
              })
              : null}
            {rollTotal ? `= ${rollTotal}` : null}
          </ul>
        </div>
        <form onSubmit={handleFormSubmit} className="form">
          <select id="quantity" name="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
          </select>
          {/* <input type="number" id="quantity" name="quantity" min="1" max="99" /> */}
          d
          <select name="sides" id="sides">
            <option value="%">&nbsp;% Percentile Dice</option>
            <option value="F">&nbsp;Fudge/Fate Dice</option>
            <option value="4">&nbsp;4 Sides</option>
            <option value="6">&nbsp;6 Sides</option>
            <option value="8">&nbsp;8 Sides</option>
            <option value="10">&nbsp;10 Sides</option>
            <option value="12">&nbsp;12 Sides</option>
            <option value="20">&nbsp;20 Sides</option>
          </select>
          <input
            id="none"
            type="radio"
            value="none"
            name="option"
            defaultChecked
            onClick={handleRadio}
          />
          <label htmlFor="none">none</label>
          <input
            id="min"
            type="radio"
            value="min"
            name="option"
            onClick={handleRadio}
          />
          <label htmlFor="min">min</label>
          <input
            id="max"
            type="radio"
            value="max"
            name="option"
            onClick={handleRadio}
          />
          <label htmlFor="max">max</label>
          {showOptionQuantity ? (
            <select id="optionQuantity" name="optionQuantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
        </select>
          ) : null}
          <input onClick={clear} type="reset" value="Reset" />
          <input type="submit" value="Submit" />
        </form>
    

    </div>
  );
}

export default App;
