import React, { useState, useEffect } from "react";
import "./DiceForm.css";
import { DiceRoll } from "rpg-dice-roller";
import Dice from "./EachDice";
import useSound from "use-sound";
import rollSound from "./Untitled.mp3";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [updateFormState, setUpdateFormState] = useState("");
  const [showOptionQuantity, setShowOptionQuantity] = useState(false);
  const [rollTotal, setRollTotal] = useState("");
  const [play] = useSound(rollSound);

  const handleRadio = (e) => {
    if (e.target.value === "none") {
      setShowOptionQuantity(false);
    } else {
      setShowOptionQuantity(true);
    }
  };

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
      if (count >480) {
        clearInterval(moving);
        setRollTotal(roll1.total);
      }
      count++;
    })
  };

  const clear = () => {
    setUpdateFormState("");
    setRollTotal("");
  };

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

  useEffect(() => {
    if (updateFormState) {
      play();
    }
  }, [updateFormState]);

  return (
    <div className="App">
      <section className="card" style={{ width: "24rem" }}>
      <div className="card-img-top">
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
          <input type="number" id="quantity" name="quantity" min="1" max="99" />
          d
          <select name="sides" id="sides">
            <option value="%">% Percentile Dice</option>
            <option value="F">Fudge/Fate Dice</option>
            <option value="4">4 Sides</option>
            <option value="6">6 Sides</option>
            <option value="8">8 Sides</option>
            <option value="10">10 Sides</option>
            <option value="12">12 Sides</option>
            <option value="20">20 Sides</option>
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
            <input
              type="number"
              id="optionQuantity"
              name="OptionQuantity"
              defaultValue="1"
              min="1"
              max="99"
            />
          ) : null}
          <input onClick={clear} type="reset" value="Reset" />
          <input type="submit" value="Submit" />
        </form>
      </section>
      
    </div>
  );
}

export default App;
