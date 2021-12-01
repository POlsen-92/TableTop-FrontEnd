import React, { useState, useEffect } from "react";

import Dice from "../Dice/Dice.js";

import ReactTooltip from "react-tooltip";
import "bootstrap/dist/css/bootstrap.css";
import "./Character.css";
import Class from "./Class";
import Race from "./Race";
import Homebrew from "./Homebrew";

export default function Character({ token }) {
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

  const [currentPage, setCurrentPage] = useState();
  const [apiResponse, setApiResponse] = useState([]);
  const [subraceResponse, setSubraceResponse] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);
  const [classapiResponse, setClassApiResponse] = useState([]);
  const [subclassResponse, setSubclassResponse] = useState([]);

  const pageHandler = (e) => {
    if (e.target.textContent === "←") {
      switch (currentPage) {
        default:
          setCurrentPage("Homebrew");
          break;
        case "Homebrew":
          setCurrentPage("Race");
          break;
        case "Race":
          setCurrentPage("Class");
          break;
        case "Class":
          setCurrentPage();
          break;
      }
    } else {
      switch (currentPage) {
        default:
          setCurrentPage("Class");
          break;
        case "Class":
          setCurrentPage("Race");
          break;
        case "Race":
          setCurrentPage("Homebrew");
          break;
        case "Homebrew":
          setCurrentPage();
          break;
      }
    }
  };

  return (
    <div className="mainPage">
      <div class="characterHeader">
        <button onClick={pageHandler}>&#8592;</button>
        <h1>Create Character</h1>
        <button onClick={pageHandler}>&#8594;</button>
      </div>
      {!currentPage ? 'Homebrew to the left, Character Journey to the right' : null}
      {currentPage === "Homebrew" ? (
        <Homebrew
          characterInfo={characterInfo}
          setCharacterInfo={setCharacterInfo}
          token={token}
        />
      ) : null}
      {currentPage === "Race" ? (
        <Race
          characterInfo={characterInfo}
          setCharacterInfo={setCharacterInfo}
          apiResponse={apiResponse}
          setApiResponse={setApiResponse}
          subraceResponse={subraceResponse}
          setSubraceResponse={setSubraceResponse}
        />
      ) : null}
      {currentPage === "Class" ? (
        <Class
          characterInfo={characterInfo}
          setCharacterInfo={setCharacterInfo}
          proficiencies={proficiencies}
          setProficiencies={setProficiencies}
          classapiResponse={classapiResponse}
          setClassApiResponse={setClassApiResponse}
          subclassResponse={subclassResponse}
          setSubclassResponse={setSubclassResponse}
        />
      ) : null}
    </div>
  );
}
