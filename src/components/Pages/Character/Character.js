import React, { useState, useEffect } from "react";
import axios from "axios";
import Dice from "../Dice/Dice.js";
import "bootstrap/dist/css/bootstrap.css";

export default function Character() {
  const [races, setRaces] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [characterInfo, setCharacterInfo] = useState({
    charName: "",
    personality: "",
    age: 1,
    race: "",
    subRace: "None",
    alignment: "",
    background: "",
    class: "",
    subClass: "None",
    level: 1,
    image_content: "",
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    speed: 0,
    hitpoints: 0,
  });
  const [subraces, setSubRaces] = useState([]);

  const handleCharacterChange = (e) => {
    const { name, value } = e.target;
    setCharacterInfo({
      ...characterInfo,
      [name]: value,
    });
  };

  const fillSubRaces = (e) => {
    setCharacterInfo({
      race: e.target.value,
    });
    let target = e.target.value.toLowerCase();
    if (target === "choose race") {
      setApiResponse([]);
      return;
    }
    axios
      .get(`https://www.dnd5eapi.co/api/races/${target}`)
      .then((response) => {
        setApiResponse(response.data);
        setSubRaces(response.data.subraces);
        console.log(response.data);
      });
  };

  const addToCharacter = (e) => {
      console.log(parseInt(e.target.getAttribute("data-amt")))
    switch (e.target.getAttribute("data-ability")) {
      case "STR":
        
        setCharacterInfo({
          strength: characterInfo.strength + parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axios.get("https://www.dnd5eapi.co/api/races").then((response) => {
      setRaces(response.data.results);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div key="1" className="col">
          <select onChange={fillSubRaces}>
            <option>Choose Race</option>
            {races.map((race, index) => {
              return <option value={race.name}>{race.name}</option>;
            })}
          </select>
          {subraces.length > 0 ? (
            <select>
              <option>Choose Sub-race</option>
              {subraces.map((race, index) => {
                return <option value={race.name}>{race.name}</option>;
              })}
            </select>
          ) : null}
        </div>
        <div key="2" className="col">
          {apiResponse.ability_bonuses
            ? apiResponse.ability_bonuses.map((bonus, index) => {
                return (
                  <p>
                    {bonus.ability_score.name}:{bonus.bonus}
                    <button
                      data-ability={bonus.ability_score.name}
                      data-amt={bonus.bonus}
                      onClick={addToCharacter}
                    >
                      Add
                    </button>
                  </p>
                );
              })
            : null}
          <Dice />
        </div>
        <div key="3" className="col">
          Character
          <form onChange={handleCharacterChange}>
            <p>
              <label for="charName">Character Name:</label>
              <input name="charName" value={characterInfo.charName} />
            </p>
            <p>
              <label for="personality">Personality:</label>
              <textarea
                name="personality"
                value={characterInfo.personality}
              ></textarea>
            </p>
            <p>
              <label for="age">Age:</label>
              <input type="number" name="age" value={characterInfo.age} />
            </p>
            <p>
              <label for="race">Race:</label>
              <input name="race" value={characterInfo.race} />
            </p>
            <p>
              <label for="subRace">Sub-Race:</label>
              <input name="subRace" value={characterInfo.subRace} />
            </p>
            <p>
              <label for="alignment">Alignment:</label>
              <textarea
                name="alignment"
                value={characterInfo.alignment}
              ></textarea>
            </p>
            <p>
              <label for="background">Background:</label>
              <textarea
                name="background"
                value={characterInfo.background}
              ></textarea>
            </p>
            <p>
              <label for="class">Class:</label>
              <input name="class" value={characterInfo.class} />
            </p>
            <p>
              <label for="subClass">Sub-Class:</label>
              <input name="subClass" value={characterInfo.subClass} />
            </p>
            <p>
              <label for="level">Level:</label>
              <input type="number" name="level" value={characterInfo.level} />
            </p>
            <p>
              <label for="strength">Strength:</label>
              <input
                type="number"
                name="strength"
                value={characterInfo.strength}
              />
            </p>
            <p>
              <label for="dexterity">Dexterity:</label>
              <input
                type="number"
                name="dexterity"
                value={characterInfo.dexterity}
              />
            </p>
            <p>
              <label for="constitution">Constitution:</label>
              <input
                type="number"
                name="constitution"
                value={characterInfo.constitution}
              />
            </p>
            <p>
              <label for="intelligence">Inteligence:</label>
              <input
                type="number"
                name="intelligence"
                value={characterInfo.intelligence}
              />
            </p>
            <p>
              <label for="wisdom">Wisdom:</label>
              <input type="number" name="wisdom" value={characterInfo.wisdom} />
            </p>
            <p>
              <label for="wisdom">Wisdom:</label>
              <input type="number" name="wisdom" value={characterInfo.wisdom} />
            </p>
            <p>
              <label for="charisma">Charisma:</label>
              <input
                type="number"
                name="charisma"
                value={characterInfo.charisma}
              />
            </p>
            <p>
              <label for="speed">Speed:</label>
              <input type="number" name="speed" value={characterInfo.speed} />
            </p>
            <p>
              <label for="hitpoints">Hitpoints:</label>
              <input
                type="number"
                name="hitpoints"
                value={characterInfo.hitpoints}
              />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
