import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import { DiceRoll } from "rpg-dice-roller";
import useSound from "use-sound";
import rollSound from "../Dice/diceSound.mp3";
import { randomNameGenerator } from "./Namegen";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Button, Card, Row, Col, FormControl } from "react-bootstrap";

let customDie = "choose";

export default function Homebrew({
  characterInfo,
  setCharacterInfo,
  token,
  proficiencies,
  classapiResponse,
  apiResponse,
  subraceResponse,
}) {
  const navigate = useNavigate();
  const [play] = useSound(rollSound);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [noClass, setNoClass] = useState(false);
  const [rollingHitpoints, setRollingHitpoints] = useState("");
  const [rollingThunda, setRollingThunda] = useState("");
  const [hideRoll, setHideRoll] = useState(true);
  const [hideBonusRoll, setHideBonusRoll] = useState(true);
  const [showBonus, setShowBonus] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  let attributes = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  const handleBackgroundChange = (e) => {
    setCharacterInfo({
      ...characterInfo,
      background: e.target.getContent(),
    });
  };
  const handlePersonalityChange = (e) => {
    setCharacterInfo({
      ...characterInfo,
      personality: e.target.getContent(),
    });
  };
  const handleAlignmentChange = (e) => {
    setCharacterInfo({
      ...characterInfo,
      alignment: e.target.getContent(),
    });
  };

  const handleCharacterChange = (e) => {
    const { name, value } = e.target;
    setCharacterInfo({
      ...characterInfo,
      [name]: value,
    });
  };

  const randomName = () => {
    setCharacterInfo({
      ...characterInfo,
      charName: randomNameGenerator("sV'i"),
    });
  };

  const calculateHitpoints = () => {
    setCharacterInfo({
      ...characterInfo,
      hitpoints: 0,
    });
    if (!classapiResponse.hit_die) {
      setNoClass(true);
      customDie = document.getElementById("sides").value;
      if (customDie === "choose") return;
    }
    setNoClass(false);
    document.getElementById("sides").selectedIndex = 0;
    const roll1 = new DiceRoll(
      1 + "d" + (classapiResponse.hit_die || customDie)
    );
    customDie = "choose";
    play();
    const moving = setInterval(() => {
      setRollingHitpoints(Math.floor(2 + Math.random() * 20));
    }, 10);
    setTimeout(() => {
      clearInterval(moving);
      setHideRoll(false);
      setCharacterInfo({
        ...characterInfo,
        hitpoints: parseInt(
          roll1.output.split("[").pop().split("]")[0].split(",")
        ),
      });
    }, 2300);
  };

  const calculateAttributes = () => {
    const roll1 = new DiceRoll("4d6");
    const roll2 = new DiceRoll("4d6");
    const roll3 = new DiceRoll("4d6");
    const roll4 = new DiceRoll("4d6");
    const roll5 = new DiceRoll("4d6");
    const roll6 = new DiceRoll("4d6");
    let rolls = [
      roll1.output,
      roll2.output,
      roll3.output,
      roll4.output,
      roll5.output,
      roll6.output,
    ];
    let total = [];
    for (let i = 0; i < 6; i++) {
      let output = rolls[i];
      output = output
        .split("[")
        .pop()
        .split("]")[0]
        .split(",")
        .map(function (item) {
          return parseInt(item, 10);
        });
      const min = Math.min(...output);
      let location = output.indexOf(min);
      output.splice(location, 1);
      total.push(output.reduce((partial, item) => partial + item));
    }
    setHideRoll(true);
    play();
    const moving = setInterval(() => {
      setRollingThunda(Math.floor(2 + Math.random() * 20));
    }, 10);
    setTimeout(() => {
      clearInterval(moving);
      if (apiResponse.ability_bonuses) setHideBonusRoll(false);
      setCharacterInfo({
        ...characterInfo,
        strength: total[0],
        dexterity: total[1],
        constitution: total[2],
        intelligence: total[3],
        wisdom: total[4],
        charisma: total[5],
      });
    }, 2300);
  };

  const addRacialBonusAttributes = () => {
    setHideBonusRoll(true);
    apiResponse.ability_bonuses.map((bonus) => {
      switch (bonus.ability_score.name) {
        case "STR":
          return (attributes = {
            ...attributes,
            strength: attributes.strength + bonus.bonus,
          });
        case "DEX":
          return (attributes = {
            ...attributes,
            dexterity: attributes.dexterity + bonus.bonus,
          });
        case "CON":
          return (attributes = {
            ...attributes,
            constitution: attributes.constitution + bonus.bonus,
          });
        case "INT":
          return (attributes = {
            ...attributes,
            intelligence: attributes.intelligence + bonus.bonus,
          });
        case "WIS":
          return (attributes = {
            ...attributes,
            wisdom: attributes.wisdom + bonus.bonus,
          });
        case "CHA":
          return (attributes = {
            ...attributes,
            charisma: attributes.charisma + bonus.bonus,
          });
        default:
          return;
      }
    });
    if (subraceResponse.ability_bonuses) {
      subraceResponse.ability_bonuses.map((bonus) => {
        switch (bonus.ability_score.name) {
          case "STR":
            return (attributes = {
              ...attributes,
              strength: attributes.strength + bonus.bonus,
            });
          case "DEX":
            return (attributes = {
              ...attributes,
              dexterity: attributes.dexterity + bonus.bonus,
            });
          case "CON":
            return (attributes = {
              ...attributes,
              constitution: attributes.constitution + bonus.bonus,
            });
          case "INT":
            return (attributes = {
              ...attributes,
              intelligence: attributes.intelligence + bonus.bonus,
            });
          case "WIS":
            return (attributes = {
              ...attributes,
              wisdom: attributes.wisdom + bonus.bonus,
            });
          case "CHA":
            return (attributes = {
              ...attributes,
              charisma: attributes.charisma + bonus.bonus,
            });
          default:
            return;
        }
      });
    }

    setCharacterInfo({
      ...characterInfo,
      strength: characterInfo.strength + attributes.strength,
      dexterity: characterInfo.dexterity + attributes.dexterity,
      constitution: characterInfo.constitution + attributes.constitution,
      intelligence: characterInfo.intelligence + attributes.intelligence,
      wisdom: characterInfo.wisdom + attributes.wisdom,
      charisma: characterInfo.charisma + attributes.charisma,
    });
    setShowBonus({
      strength: attributes.strength,
      dexterity: attributes.dexterity,
      constitution: attributes.constitution,
      intelligence: attributes.intelligence,
      wisdom: attributes.wisdom,
      charisma: attributes.charisma,
    });
  };

  const handleClose = (e) => {
    if (!e) {
      setShow(false);
      setError(false);
    } else if (e.target.textContent === "Close") {
      setShow(false);
      setError(false);
    } else {
      const campaignId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
      API.createCharacter(characterInfo, campaignId, token).then((res) => {
        if (proficiencies) {
          proficiencies.map((items) => {
            const data = {
              name: items,
            };
            API.createNewProficiency(res.data.id, data, token).then(() => {
              navigate(`/campaign/${campaignId}`);
            });
          });
        }
        navigate(`/campaign/${campaignId}`);
      });
    }
  };

  const handleShow = () => {
    if (characterInfo.charName !== "") {
      setShow(true);
    } else {
      setError(true);
    }
  };

  const cardStyle = {
    height: "500px",
    width: "20rem",
  };

  return (
    <div>
      <button variant="secondary" size="sm" onClick={handleShow}>
        Save
      </button>
      {"    "}
      <button
        variant="secondary"
        size="sm"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>

      <Row className="m-5">
        <Col className="mb-5">
          <Card
            className="mx-auto bg-transparent bg-transparent"
            style={cardStyle}
          >
            <Card.Header>Character Name / Age</Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="text"
                  onChange={handleCharacterChange}
                  name="charName"
                  value={characterInfo.charName}
                  className="bg-transparent"
                />
              </p>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="age"
                  value={characterInfo.age}
                  className="bg-transparent"
                />
              </p>
            </Card.Body>
            <Card.Footer>
              <button onClick={randomName} variant="secondary" size="lg">
                Random
              </button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>Race / Subrace</Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="text"
                  onChange={handleCharacterChange}
                  name="race"
                  value={characterInfo.race}
                  className="bg-transparent"
                />
              </p>
              <p>
                <FormControl
                  type="text"
                  onChange={handleCharacterChange}
                  name="subRace"
                  value={characterInfo.subRace}
                  className="bg-transparent"
                />
              </p>
              <div>
                {apiResponse.ability_bonuses
                  ? apiResponse.ability_bonuses.map((bonus, index) => {
                      return (
                        <p key={index}>
                          {bonus.ability_score.name}:{bonus.bonus}
                        </p>
                      );
                    })
                  : null}
                {subraceResponse.ability_bonuses
                  ? subraceResponse.ability_bonuses.map((bonus, index) => {
                      return (
                        <p key={index}>
                          {bonus.ability_score.name}:{bonus.bonus}
                        </p>
                      );
                    })
                  : null}
              </div>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>Class / Subclass / Level</Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="text"
                  onChange={handleCharacterChange}
                  name="class"
                  value={characterInfo.class}
                  className="bg-transparent"
                />
              </p>
              <p>
                <FormControl
                  type="text"
                  onChange={handleCharacterChange}
                  name="subClass"
                  value={characterInfo.subClass}
                  className="bg-transparent"
                />
              </p>
              <p>
                <FormControl
                  type="text"
                  onChange={handleCharacterChange}
                  name="level"
                  value={characterInfo.level}
                  className="bg-transparent"
                />
              </p>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>Proficiencies</Card.Header>
            <Card.Body>
              <ul className="list-group list-group-flush">
                {proficiencies.map((items, index) => {
                  return (
                    <li key={index} className="list-group-item bg-transparent">
                      {items}
                    </li>
                  );
                })}
              </ul>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>Speed</Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="speed"
                  value={characterInfo.speed}
                  className="bg-transparent"
                />
              </p>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="hitpoints">
                Hitpoints
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="hitpoints"
                  value={
                    characterInfo.hitpoints
                      ? characterInfo.hitpoints
                      : rollingHitpoints
                  }
                  className="bg-transparent"
                />
              </p>
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="hitpoints">
                <p>1d{classapiResponse.hit_die}</p>
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
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <div className={noClass ? "" : "hide"}>
          Choose a class on the class screen or provide the number of sides you
          want to use:
          <select name="sides" id="sides">
            <option key="22" value="choose">
              Choose
            </option>
            <option key="33" value="4">
              4 Sides
            </option>
            <option key="44" value="6">
              6 Sides
            </option>
            <option key="55" value="8">
              8 Sides
            </option>
            <option key="66" value="10">
              10 Sides
            </option>
            <option key="77" value="12">
              12 Sides
            </option>
            <option key="88" value="20">
              20 Sides
            </option>
          </select>
        </div>

        <div>
          {/* {!rollingHitpoints ? ( */}
          <button
            data-tip
            data-for="hitpointsButton"
            className="mb-5"
            onClick={calculateHitpoints}
            style={{ visibility: rollingHitpoints ? "hidden" : null }}
          >
            Roll for hitpoints
          </button>
          {/* ) : null} */}
          {!hideRoll ? (
            <button onClick={calculateAttributes} className="mb-5">
              Roll for attributes
            </button>
          ) : null}
          {!hideBonusRoll ? (
            <button onClick={addRacialBonusAttributes}>Add Racial Bonus</button>
          ) : null}
        </div>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="strength">
                Strength
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="strength"
                  value={
                    characterInfo.strength
                      ? characterInfo.strength
                      : rollingThunda
                  }
                  className="bg-transparent"
                />
              </p>
              {showBonus.strength ? (
                <span>&#40;{showBonus.strength}&#41;</span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="strength">
                <p>
                  Each score is generated randomly by using the sum of the
                  highest 3 out of 4 rolls of a 6 sided dice (4d6).
                </p>
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
            </Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="dexterityButton">
                Dexterity
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="dexterity"
                  value={
                    characterInfo.dexterity
                      ? characterInfo.dexterity
                      : rollingThunda
                  }
                  className="bg-transparent"
                />
              </p>
              {showBonus.dexterity ? (
                <span>&#40;{showBonus.dexterity}&#41;</span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="dexterityButton">
                <p>
                  Each score is generated randomly by using the sum of the
                  highest 3 out of 4 rolls of a 6 sided dice (4d6).
                </p>
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
            </Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="constitutionButton">
                Constitution
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="constitution"
                  value={
                    characterInfo.constitution
                      ? characterInfo.constitution
                      : rollingThunda
                  }
                  className="bg-transparent"
                />
              </p>
              {showBonus.constitution ? (
                <span>&#40;{showBonus.constitution}&#41;</span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="constitutionButton">
                <p>
                  Each score is generated randomly by using the sum of the
                  highest 3 out of 4 rolls of a 6 sided dice (4d6).
                </p>
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
            </Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="intelligenceButton">
                Intelligence
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="intelligence"
                  value={
                    characterInfo.intelligence
                      ? characterInfo.intelligence
                      : rollingThunda
                  }
                  className="bg-transparent"
                />
              </p>
              {showBonus.intelligence ? (
                <span>&#40;{showBonus.intelligence}&#41;</span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="intelligenceButton">
                <p>
                  Each score is generated randomly by using the sum of the
                  highest 3 out of 4 rolls of a 6 sided dice (4d6).
                </p>
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
            </Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="wisdomButton">
                Wisdom
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="wisdom"
                  value={
                    characterInfo.wisdom ? characterInfo.wisdom : rollingThunda
                  }
                  className="bg-transparent"
                />
              </p>
              {showBonus.wisdom ? (
                <span>&#40;{showBonus.wisdom}&#41;</span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="wisdomButton">
                <p>
                  Each score is generated randomly by using the sum of the
                  highest 3 out of 4 rolls of a 6 sided dice (4d6).
                </p>
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
            </Card.Footer>
          </Card>
        </Col>
        <Col className="mb-5">
          <Card className="mx-auto bg-transparent" style={cardStyle}>
            <Card.Header>
              <div data-tip data-for="charismaButton">
                Charisma
              </div>
            </Card.Header>
            <Card.Body>
              <p>
                <FormControl
                  type="number"
                  onChange={handleCharacterChange}
                  name="charisma"
                  value={
                    characterInfo.charisma
                      ? characterInfo.charisma
                      : rollingThunda
                  }
                  className="bg-transparent"
                />
              </p>
              {showBonus.charisma ? (
                <span>&#40;{showBonus.charisma}&#41;</span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ReactTooltip className="tooltip" id="charismaButton">
                <p>
                  Each score is generated randomly by using the sum of the
                  highest 3 out of 4 rolls of a 6 sided dice (4d6).
                </p>
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
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <div className="row justify-content-center">
        <div data-tip data-for="background">
          <h2>Background</h2>
        </div>
        <ReactTooltip className="tooltip" id="background">
          <p>
            Every story has a beginning. Your character's background reveals
            where you came from, how you became an adventurer, and your place in
            the world. Your fighter might have been a courageous knight or a
            grizzled soldier. Your wizard could have been a sage or an artisan.
            Your rogue might have gotten by as a guild thief or commanded
            audiences as a jester. Choosing a background provides you with
            important story cues about your character's identity.
          </p>
        </ReactTooltip>
        <Editor
          initialValue="<p>Write your story here!</p>"
          apiKey={process.env.REACT_APP_TINYAPI}
          init={{
            height: 300,
            width: "80%",
            menubar: true,
            skin: "oxide-dark",
            content_css: "dark",
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent image | help",
          }}
          onChange={handleBackgroundChange}
        />
      </div>
      <div className="row justify-content-center">
        <div data-tip data-for="personality">
          <h2>Personality</h2>
        </div>
        <ReactTooltip className="tooltip" id="personality">
          <p>
            Fleshing out your character's personality--the array of traits,
            mannerisms, habits, bliefs, and flaws that give a person a unique
            identity--will help you bring them to life as you play the game.
          </p>
        </ReactTooltip>
        <Editor
          initialValue="<p>What is your character's personality?</p>"
          apiKey={process.env.REACT_APP_TINYAPI}
          init={{
            height: 300,
            width: "80%",
            menubar: true,
            skin: "oxide-dark",
            content_css: "dark",
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent image | help",
          }}
          onChange={handlePersonalityChange}
        />
      </div>
      <div className="row justify-content-center">
        <div data-tip data-for="alignment">
          <h2>Alignment</h2>
        </div>

        <ReactTooltip className="tooltip" id="alignment">
          <p>
            A typical creater in the world has an alignment, which boradly
            describes its moral and personal attitudes. Alignment is a
            combination of two factors: one identifies morality (good, evil, or
            neutral), and the other describes attitudes toward society and order
            (lawful, chaotic, and neutral).
          </p>
        </ReactTooltip>
        <Editor
          initialValue="<p>What is your character's alignment?</p>"
          apiKey={process.env.REACT_APP_TINYAPI}
          init={{
            height: 300,
            width: "80%",
            menubar: true,
            skin: "oxide-dark",
            content_css: "dark",
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent image | help",
          }}
          onChange={handleAlignmentChange}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Save?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure? Once you save you won't be able to edit the race and
          class.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={error} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The character's name needs to be filled out before saving.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
      <br />
    </div>
  );
}
