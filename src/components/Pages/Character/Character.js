import React, { useState, useEffect } from "react";
import createDOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.css";
import "./Character.css";
import Class from "./Class";
import Race from "./Race";
import Homebrew from "./Homebrew";
import pointer from "./pointer-min.png";
import journey from "./journey-min.jpg";

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

  const [currentPage, setCurrentPage] = useState({
    current: "Home",
    left: "Homebrew",
    right: "Race",
  });
  const [apiResponse, setApiResponse] = useState([]);
  const [subraceResponse, setSubraceResponse] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);
  const [classapiResponse, setClassApiResponse] = useState([]);
  const [subclassResponse, setSubclassResponse] = useState([]);

  const pageHandler = (e) => {
    if (e.target.value === "left") {
      switch (currentPage.current) {
        default:
          setCurrentPage({
            current: "Homebrew",
            left: "Class",
            right: "Home",
          });
          break;
        case "Homebrew":
          setCurrentPage({
            current: "Class",
            left: "Race",
            right: "Homebrew",
          });
          break;
        case "Race":
          setCurrentPage({
            current: "Home",
            left: "Homebrew:",
            right: "Race",
          });
          break;
        case "Class":
          setCurrentPage({
            current: "Race",
            left: "Home",
            right: "Class",
          });
          break;
      }
    } else {
      switch (currentPage.current) {
        default:
          setCurrentPage({
            current: "Race",
            left: "Home",
            right: "Class",
          });
          break;
        case "Homebrew":
          setCurrentPage({
            current: "Home",
            left: "Homebrew",
            right: "Race",
          });
          break;
        case "Race":
          setCurrentPage({
            current: "Class",
            left: "Race",
            right: "Homebrew",
          });
          break;
        case "Class":
          setCurrentPage({
            current: "Homebrew",
            left: "Class",
            right: "Home",
          });
          break;
      }
    }
  };

  const display = () => {
    return (
      <div>
        <h1>
          Begin your journey that way!{" "}
          <img
            src={pointer}
            height="100px"
            width="200px"
            alt="finger pointing"
          />{" "}
        </h1>
        <img id="journey" src={journey} alt="journey begins" />
      </div>
    );
  };

  return (
    <div className="mainPage">
      <br />
      <div className="characterHeader">
        <button value="left" onClick={pageHandler}>
          &#8592;{currentPage.left}
        </button>
        <h1>Create Character</h1>
        <button value="right" onClick={pageHandler}>
          {currentPage.right}&#8594;
        </button>
      </div>
      {currentPage.current === "Home" ? display() : null}

      {currentPage.current === "Homebrew" ? (
        <Homebrew
          characterInfo={characterInfo}
          setCharacterInfo={setCharacterInfo}
          token={token}
          proficiencies={proficiencies}
          classapiResponse={classapiResponse}
          apiResponse={apiResponse}
          subraceResponse={subraceResponse}
        />
      ) : null}
      {currentPage.current === "Race" ? (
        <Race
          characterInfo={characterInfo}
          setCharacterInfo={setCharacterInfo}
          apiResponse={apiResponse}
          setApiResponse={setApiResponse}
          subraceResponse={subraceResponse}
          setSubraceResponse={setSubraceResponse}
        />
      ) : null}
      {currentPage.current === "Class" ? (
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
