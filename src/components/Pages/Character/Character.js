import React, { useState, useEffect } from "react";
import axios from "axios";
import Dice from "../Dice/Dice.js";
import API from "../../../utils/API"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Character.css";

export default function Character(props) {
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [classapiResponse, setClassApiResponse] = useState([]);
  const [subraceResponse, setSubraceResponse] = useState([]);
  const [subclassResponse, setSubclassResponse] = useState([]);
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
    // proficiency: [],
  });
  const [subraces, setSubRaces] = useState([]);
  const [subclasses, setSubClasses] = useState([]);

  const handleCharacterChange = (e) => {
    const { name, value } = e.target;
    setCharacterInfo({
      ...characterInfo,
      [name]: value,
    });
  };

  const fillSubRaces = (e) => {
    setCharacterInfo({
      ...characterInfo,
      race: e.target.value,
    });
    let target = e.target.value.toLowerCase();
    if (target === "choose race") {
      setApiResponse([]);
      setSubRaces([]);
      return;
    }
    axios
      .get(`https://www.dnd5eapi.co/api/races/${target}`)
      .then((response) => {
        setApiResponse(response.data);
        setSubRaces(response.data.subraces);
      });
  };

  const pickSubRace = (e) => {
    if (e.target.value === "Choose Sub-Race") {
      setCharacterInfo({
        ...characterInfo,
        subRace: "None",
      });
    } else {
      setCharacterInfo({
        ...characterInfo,
        subRace: e.target.value,
      });
      axios
        .get(`https://www.dnd5eapi.co/api/subraces/${e.target.value}`)
        .then((response) => {
          setSubraceResponse(response.data);
          console.log(response.data);
        });
    }
  };

  const fillSubClasses = (e) => {
    setCharacterInfo({
      ...characterInfo,
      class: e.target.value,
    });
    let target = e.target.value.toLowerCase();
    if (target === "choose class") {
      setClassApiResponse([]);
      setSubClasses([]);
      return;
    }
    axios
      .get(`https://www.dnd5eapi.co/api/classes/${target}`)
      .then((response) => {
        setClassApiResponse(response.data);
        setSubClasses(response.data.subclasses);
        console.log(response.data);
      });
  };

  const pickSubClass = (e) => {
    if (e.target.value === "Choose Sub-Class") {
      setCharacterInfo({
        ...characterInfo,
        subClass: "None",
      });
      setSubClasses([]);
      setSubclassResponse([]);
    } else {
      setCharacterInfo({
        ...characterInfo,
        subClass: e.target.value,
      });
      axios
        .get(`https://www.dnd5eapi.co/api/subclasses/${e.target.value}`)
        .then((response) => {
          setSubclassResponse(response.data);
          console.log(response.data);
        });
    }
  };

  const addBonusToCharacter = (e) => {
    e.target.disabled = true;
    switch (e.target.getAttribute("data-ability")) {
      case "STR":
        setCharacterInfo({
          ...characterInfo,
          strength:
            characterInfo.strength +
            parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      case "DEX":
        setCharacterInfo({
          ...characterInfo,
          dexterity:
            characterInfo.dexterity +
            parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      case "CON":
        setCharacterInfo({
          ...characterInfo,
          constitution:
            characterInfo.constitution +
            parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      case "INT":
        setCharacterInfo({
          ...characterInfo,
          intelligence:
            characterInfo.intelligence +
            parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      case "WIS":
        setCharacterInfo({
          ...characterInfo,
          wisdom:
            characterInfo.wisdom + parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      case "CHA":
        setCharacterInfo({
          ...characterInfo,
          charisma:
            characterInfo.charisma +
            parseInt(e.target.getAttribute("data-amt")),
        });
        break;
      default:
        break;
    }
  };

  const addInfo = (e) => {
    const { name } = e.target;
    setCharacterInfo({
      ...characterInfo,
      [name]: e.target.getAttribute("data-info"),
    });
  };

  // const checkcontrol = (e) => {
  //   let tempArray = characterInfo.proficiency
  //   console.log(e.target.textContent)
  //   setCharacterInfo({
  //     ...characterInfo,
  //     proficiency:[]
  //   })
  //   if (tempArray.includes(e.target.textContent)) {
  //     let index = tempArray.indexOf(e.target.textContent) 
  //     tempArray.splice(index,1)
  //   } else {
  //     tempArray.push(e.target.textContent)
  //   }
    
   
  //   setCharacterInfo({
  //     ...characterInfo,
  //     proficiency:tempArray
  //   })
  //   console.log(characterInfo.proficiency)
  // };

  

  const saveCharacter = () => {
    const campaignId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    API.createCharacter(characterInfo,campaignId,props.token)
    console.log(characterInfo)

  };

  useEffect(() => {
    axios.get("https://www.dnd5eapi.co/api/races").then((response) => {
      setRaces(response.data.results);
    });
    axios.get("https://www.dnd5eapi.co/api/classes").then((response) => {
      setClasses(response.data.results);
    });
    console.log(apiResponse);
  }, []);

  return (
    <div id="character" className="container">
      <div className="row">
        <div id="classinfo" className="col">
          <div>
            <select onChange={fillSubClasses}>
              <option key="111">Choose Class</option>
              {classes.map((classes, index) => {
                return (
                  <option key={index} value={classes.name}>
                    {classes.name}
                  </option>
                );
              })}
            </select>
            {subclasses.length > 0 ? (
              <select onChange={pickSubClass}>
                <option key="99">Choose Sub-Class</option>
                {subclasses.map((classes, index) => {
                  return (
                    <option key={index} value={classes.index}>
                      {classes.name}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>

          {classapiResponse.length !== 0 ? (
            <div>
              <h3>Hit Die</h3>
              <h4>{classapiResponse.hit_die}</h4>
              <h3>Saving Throws</h3>
              {classapiResponse.saving_throws.map((items, index) => {
                return <p key={index}>{items.name}</p>;
              })}
              <h3>Proficiency Choices</h3> (choose{" "}
              {classapiResponse.proficiency_choices[0].choose})
              <ul>
                {classapiResponse.proficiency_choices[0].from.map(
                  (items, index) => {
                    return (
                      <>
                        <li key={index}>{items.name}</li>
                      </>
                    );
                  }
                )}
              </ul>
              {subclassResponse.desc ? <h3>Sub-Class Description</h3> : null}
              {subclassResponse.desc}
            </div>
          ) : null}
        </div>
        <div id="raceinfo" className="col">
          <div>
            <div>
              <select onChange={fillSubRaces}>
                <option key="111">Choose Race</option>
                {races.map((race, index) => {
                  return (
                    <option key={index} value={race.name}>
                      {race.name}
                    </option>
                  );
                })}
              </select>
              {subraces.length > 0 ? (
                <select onChange={pickSubRace}>
                  <option key="99">Choose Sub-Race</option>
                  {subraces.map((race, index) => {
                    return (
                      <option key={index} value={race.index}>
                        {race.name}
                      </option>
                    );
                  })}
                </select>
              ) : null}
            </div>
            {apiResponse.length !== 0 ? (
              <div>
                <div>
                  <h3>Age</h3>
                  {apiResponse.age}
                  <h3>Language</h3>
                  {apiResponse.language_desc}
                  <h3>Size</h3>
                  {apiResponse.size_description}
                  <h3>Alignment</h3>
                  {apiResponse.alignment}
                  <button
                    name="alignment"
                    onClick={addInfo}
                    data-info={apiResponse.alignment}
                  >
                    Add
                  </button>
                  <h3>Race Ability Bonuses</h3>
                  {apiResponse.ability_bonuses
                    ? apiResponse.ability_bonuses.map((bonus, index) => {
                        return (
                          <p key={index}>
                            {bonus.ability_score.name}:{bonus.bonus}
                            <button
                              data-ability={bonus.ability_score.name}
                              data-amt={bonus.bonus}
                              onClick={addBonusToCharacter}
                            >
                              Add
                            </button>
                          </p>
                        );
                      })
                    : null}
                  {subraceResponse.ability_bonuses ? (
                    <h3>Sub-Race Ability Bonuses</h3>
                  ) : null}
                  {subraceResponse.ability_bonuses
                    ? subraceResponse.ability_bonuses.map((bonus, index) => {
                        return (
                          <p key={index}>
                            {bonus.ability_score.name}:{bonus.bonus}
                            <button
                              data-ability={bonus.ability_score.name}
                              data-amt={bonus.bonus}
                              onClick={addBonusToCharacter}
                            >
                              Add
                            </button>
                          </p>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <Dice />
          </div>
        </div>
        <div className="col">
          Character <button onClick={saveCharacter}>Save</button>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset
          </button>
          <form className="form-group" onChange={handleCharacterChange}>
            <label for="charName">Character Name:</label>
            <input name="charName" value={characterInfo.charName} />
            <label for="personality">Personality:</label>
            <textarea
              name="personality"
              value={characterInfo.personality}
              placeholder="Fill me out"
            ></textarea>
            <label for="age">Age:</label>
            <input type="number" name="age" value={characterInfo.age} />
            <label for="race">Race:</label>
            <input name="race" value={characterInfo.race} />
            <label for="subRace">Sub-Race:</label>
            <input name="subRace" value={characterInfo.subRace} />
            <label for="alignment">Alignment:</label>
            <textarea
              name="alignment"
              value={characterInfo.alignment}
              placeholder="Fill me out"
            ></textarea>
            <label for="background">Background:</label>
            <textarea
              name="background"
              value={characterInfo.background}
              placeholder="Fill me out"
            ></textarea>
            <label for="class">Class:</label>
            <input name="class" value={characterInfo.class} />
            <label for="subClass">Sub-Class:</label>
            <input name="subClass" value={characterInfo.subClass} />
            {/* <label for="proficiency">Proficiencies:</label>
            <ul>
            {characterInfo.proficiency.map((items,index)=>{
              return <li key={index}>{items}</li>
            })}
            </ul> */}
            <label for="level">Level:</label>
            <input type="number" name="level" value={characterInfo.level} />
            <label for="strength">Strength:</label>
            <input
              type="number"
              name="strength"
              value={characterInfo.strength}
            />
            <label for="dexterity">Dexterity:</label>
            <input
              type="number"
              name="dexterity"
              value={characterInfo.dexterity}
            />
            <label for="constitution">Constitution:</label>
            <input
              type="number"
              name="constitution"
              value={characterInfo.constitution}
            />
            <label for="intelligence">Inteligence:</label>
            <input
              type="number"
              name="intelligence"
              value={characterInfo.intelligence}
            />
            <label for="wisdom">Wisdom:</label>
            <input type="number" name="wisdom" value={characterInfo.wisdom} />
            <label for="charisma">Charisma:</label>
            <input
              type="number"
              name="charisma"
              value={characterInfo.charisma}
            />
            <label for="speed">Speed:</label>
            <input type="number" name="speed" value={characterInfo.speed} />
            <label for="hitpoints">Hitpoints:</label>
            <input
              type="number"
              name="hitpoints"
              value={characterInfo.hitpoints}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
