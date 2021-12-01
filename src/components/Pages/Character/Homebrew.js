import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import Dice from "../Dice/Dice"

export default function Homebrew({
  characterInfo,
  setCharacterInfo,
  token,
  proficiencies,
}) {
  const navigate = useNavigate();
  const handleCharacterChange = (e) => {
    const { name, value } = e.target;
    setCharacterInfo({
      ...characterInfo,
      [name]: value,
    });
  };
  const saveCharacter = () => {
    const campaignId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    API.createCharacter(characterInfo, campaignId, token).then((res) => {
      console.log(res.data.id);

      proficiencies.map((items) => {
        const data = {
          name: items,
        };
        API.createNewProficiency(res.data.id, data, token).then((res) => {
          console.log(res.data);
        });
      });
    });

    navigate(`/campaign/${campaignId}`);
  };
  return (
    <div>
      <button onClick={saveCharacter}>Save</button>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>
      <Dice/>
      <form className="form-group" onChange={handleCharacterChange}>
        <div className="row">
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="charName">Character Name:</label>
            <input name="charName" defaultValue={characterInfo.charName} />
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="personality">
              <label for="personality">Personality:</label>
              <textarea
                name="personality"
                defaultValue={characterInfo.personality}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="age">Age:</label>
            <input type="number" name="age" defaultValue={characterInfo.age} />
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="race">Race:</label>
            <input name="race" defaultValue={characterInfo.race} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="subRace">Sub-Race:</label>
            <input name="subRace" defaultValue={characterInfo.subRace} />
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="alignment">
              <label for="alignment">Alignment:</label>
              <textarea
                name="alignment"
                defaultValue={characterInfo.alignment}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="background">
              <label for="background">Background:</label>
              <textarea
                name="background"
                defaultValue={characterInfo.background}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="class">Class:</label>
            <input name="class" defaultValue={characterInfo.class} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="subClass">Sub-Class:</label>
            <input name="subClass" defaultValue={characterInfo.subClass} />
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="level">Level:</label>
            <input
              type="number"
              name="level"
              defaultValue={characterInfo.level}
            />
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="strength">
              <label for="strength">Strength:</label>
              <input
                type="number"
                name="strength"
                defaultValue={characterInfo.strength}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="dexterity">
              <label for="dexterity">Dexterity:</label>
              <input
                type="number"
                name="dexterity"
                defaultValue={characterInfo.dexterity}
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
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="constitution">
              <label for="constitution">Constitution:</label>
              <input
                type="number"
                name="constitution"
                defaultValue={characterInfo.constitution}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="intelligence">
              <label for="intelligence">Intelligence:</label>
              <input
                type="number"
                name="intelligence"
                defaultValue={characterInfo.intelligence}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="wisdom">
              <label for="wisdom">Wisdom:</label>
              <input
                type="number"
                name="wisdom"
                defaultValue={characterInfo.wisdom}
              />
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="charisma">
              <label for="charisma">Charisma:</label>
              <input
                type="number"
                name="charisma"
                defaultValue={characterInfo.charisma}
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
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="speed">
              <label for="speed">Speed:</label>
              <input
                type="number"
                name="speed"
                defaultValue={characterInfo.speed}
              />
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <div data-tip data-for="hitpoints">
              <label for="hitpoints">Hitpoints:</label>
              <input
                type="number"
                name="hitpoints"
                defaultValue={characterInfo.hitpoints}
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
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-3">
            <label for="proficiencies">Proficiencies</label>
            <textarea
              readOnly
              name="proficiencies"
              defaultValue={proficiencies}
              placeholder="Pick on the character page"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
