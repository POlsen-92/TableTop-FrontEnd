import React, { useState, useEffect } from "react";
import axios from "axios";
import Dice from "../Dice/Dice.js";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
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
  });
  const navigate = useNavigate();
  const [proficiencies, setProficiencies] = useState([]);
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

  const proficienciesControl = (e) => {
    if (proficiencies.includes(e.target.textContent)) {
      setProficiencies([proficiencies.filter((items) => {
        return items !== e.target.textContent
      })])
    } else {
      setProficiencies([...proficiencies, e.target.textContent])
    }
  };

  const saveCharacter = () => {

    const campaignId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    API.createCharacter(characterInfo, campaignId, props.token);
    console.log(characterInfo);
    navigate(`/campaign/${campaignId}`)
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
              <ul onClick={proficienciesControl}>
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
              <h3>Chosen Proficiencies</h3>
              <ul>
                {proficiencies.map((items, index) => {
                  return <li key={index}>{items}</li>;
                })}
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
            <div data-tip data-for="personality">
              <label for="personality">Personality:</label>
              <textarea
                name="personality"
                value={characterInfo.personality}
                placeholder="Fill me out"
              ></textarea>
              <ReactTooltip id="personality">
                <p>
                  Fleshing out your character's personality--the array of
                  traits, mannerisms, habits, <br />
                  belives, and flaws that give a person a unique identity--will
                  help you bring them
                  <br />
                  to life as you play the game.
                </p>
              </ReactTooltip>
            </div>
            <label for="age">Age:</label>
            <input type="number" name="age" value={characterInfo.age} />
            <label for="race">Race:</label>
            <input name="race" value={characterInfo.race} />
            <label for="subRace">Sub-Race:</label>
            <input name="subRace" value={characterInfo.subRace} />
            <div data-tip data-for="alignment">
              <label for="alignment">Alignment:</label>
              <textarea
                name="alignment"
                value={characterInfo.alignment}
                placeholder="Fill me out"
              ></textarea>
              <ReactTooltip id="alignment">
                <p>
                  A typical character has an alignment, which broadlly describes
                  its moral and personal attitudes
                  <br />
                  Alignment is a combination of two factors: one identifies
                  morality (good, evil, or neutral), and the
                  <br />
                  other describes attitudes toward society and order (lawful,
                  chaotic, or neutral).
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="background">
              <label for="background">Background:</label>
              <textarea
                name="background"
                value={characterInfo.background}
                placeholder="Fill me out"
              ></textarea>
              <ReactTooltip id="background">
                <p>
                  Every story has a beginning. Your character's background
                  reveals where you came from, how you <br />
                  became an adventurer, and your place in the world. Your
                  fighter might have been a courageous
                  <br />
                  knight or a grizzled soldier. Your wizard coul dhave been a
                  sage or an atrisan. Your rogue might <br />
                  have gotten by as a guild thief or commanded audiences as a
                  jester.
                </p>
              </ReactTooltip>
            </div>
            <label for="class">Class:</label>
            <input name="class" value={characterInfo.class} />
            <label for="subClass">Sub-Class:</label>
            <input name="subClass" value={characterInfo.subClass} />
            <label for="level">Level:</label>
            <input type="number" name="level" value={characterInfo.level} />
            <div data-tip data-for="strength">
              <label for="strength">Strength:</label>
              <input
                type="number"
                name="strength"
                value={characterInfo.strength}
              />
              <ReactTooltip id="strength">
                <p>
                  Strength measures bodily power, athletic training, and the
                  extent to which you can exert raw physical force.
                  <br />
                  A Strength check can model any attempt to lift, push, pull, or
                  break something, to force your body through a space,
                  <br />
                  or to otherwise apply brute force to a situation. The
                  Athletics skill reflects aptitude in certain kinds of Strength
                  checks.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="dexterity">
              <label for="dexterity">Dexterity:</label>
              <input
                type="number"
                name="dexterity"
                value={characterInfo.dexterity}
              />
              <ReactTooltip id="dexterity">
                <p>
                  Dexterity measures agility, reflexes, and balance. A Dexterity
                  check can model any attempt to move
                  <br />
                  nimbly, quickly, or quietly, or to keep from falling on tricky
                  footing. The Acrobatics, Sleight of Hand, <br />
                  and Stealth skills reflect aptitude in certain kinds of
                  Dexterity checks.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="constitution">
              <label for="constitution">Constitution:</label>
              <input
                type="number"
                name="constitution"
                value={characterInfo.constitution}
              />
              <ReactTooltip id="constitution">
                <p>
                  Constitution measures health, stamina, and vital force.
                  Constitution checks are uncommon,
                  <br />
                  and no skills apply to Constitution checks, because the
                  endurance this ability represents is
                  <br />
                  largely passive rather than involving a specific effort on the
                  part of a character or monster.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="intelligence">
              <label for="intelligence">Intelligence:</label>
              <input
                type="number"
                name="intelligence"
                value={characterInfo.intelligence}
              />
              <ReactTooltip id="intelligence">
                <p>
                  Intelligence measures mental acuity, accuracy of recall, and
                  the ability to reason. An Intelligence
                  <br />
                  check comes into play when you need to draw on logic,
                  education, memory, or deductive reasoning. <br />
                  The Arcana, History, Investigation, Nature, and Religion
                  skills reflect aptitude in certain kinds of <br />
                  Intelligence checks.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="wisdom">
              <label for="wisdom">Wisdom:</label>
              <input type="number" name="wisdom" value={characterInfo.wisdom} />
              <ReactTooltip id="wisdom">
                <p>
                  Wisdom reflects how attuned you are to the world around you
                  and represents perceptiveness and intuition.
                  <br />
                  A Wisdom check might reflect an effort to read body language,
                  understand someone's feelings, notice <br />
                  things about the environment, or care for an injured person.
                  The Animal Handling, Insight, Medicine, <br />
                  Perception, and Survival skills reflect aptitude in certain
                  kinds of Wisdom checks.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="charisma">
              <label for="charisma">Charisma:</label>
              <input
                type="number"
                name="charisma"
                value={characterInfo.charisma}
              />
              <ReactTooltip id="charisma">
                <p>
                  Charisma measures your ability to interact effectively with
                  others. It includes such factors as confidence <br />
                  and eloquence, and it can represent a charming or commanding
                  personality. A Charisma check might arise when <br />
                  you try to influence or entertain others, when you try to make
                  an impression or tell a convincing lie, or <br />
                  when you are navigating a tricky social situation. The
                  Deception, Intimidation, Performance, and Persuasion <br />
                  skills reflect aptitude in certain kinds of Charisma checks.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="speed">
              <label for="speed">Speed:</label>
              <input type="number" name="speed" value={characterInfo.speed} />
              <ReactTooltip id="speed">
                <p>
                  Every character and monster has a speed, which is the distance
                  in feet that the character or monster <br />
                  can walk in 1 round. This number assumes short bursts of
                  energetic movement in the midst of a life-threatening
                  situation.
                </p>
              </ReactTooltip>
            </div>
            <div data-tip data-for="hitpoints">
              <label for="hitpoints">Hitpoints:</label>
              <input
                type="number"
                name="hitpoints"
                value={characterInfo.hitpoints}
              />
              <ReactTooltip id="hitpoints">
                <p>
                  Your character's hit points define how tough your character is
                  in combat and other dangerous situations. Your <br />
                  hit points are determined by your Hit Dice. At 1st level, your
                  character has 1 Hit Die and the die type is <br />
                  determined by your class. You start with hit points equal to
                  the highest roll of that die, as indicated in your class
                  <br />
                  description.
                </p>
              </ReactTooltip>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
