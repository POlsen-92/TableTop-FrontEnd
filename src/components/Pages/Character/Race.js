import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export default function Race({
  characterInfo,
  setCharacterInfo,
  apiResponse,
  setApiResponse,
  subraceResponse,
  setSubraceResponse,
}) {
  const [races, setRaces] = useState([]);

  const [subraces, setSubRaces] = useState([]);

  const fillSubRaces = (e) => {
    setCharacterInfo({
      ...characterInfo,
      race: e.target.value,
      subRace: "None",
    });
    setSubraceResponse([]);
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
        setCharacterInfo({
            ...characterInfo,
            speed: response.data.speed
        })
        if (response.data.subraces.length === 0) {
          setSubRaces([]);
        } else {
          setSubRaces(response.data.subraces);
        }
      });
  };

  const pickSubRace = (e) => {
    if (e.target.value === "Choose Sub-Race") {
      setCharacterInfo({
        ...characterInfo,
        subRace: "None",
      });
      setSubraceResponse([]);
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

  useEffect(() => {
    axios.get("https://www.dnd5eapi.co/api/races").then((response) => {
      setRaces(response.data.results);
    });
  }, [!races]);
  
  return (
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
        <div className="container">
          <div className="raceInfo">
            <h1>
              {characterInfo.subRace !== "None"
                ? characterInfo.subRace
                : characterInfo.race}
            </h1>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Age</h2>
              </div>
              <div className="col-sm-12 col-md-8">{apiResponse.age}</div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Language</h2>
              </div>
              <div className="col-sm-12 col-md-8">
                {apiResponse.language_desc}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Size</h2>
              </div>
              <div className="col-sm-12 col-md-8">
                {apiResponse.size_description}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Alignment</h2>
              </div>
              <div className="col-sm-12 col-md-8">
                {apiResponse.alignment}
                <button
                  name="alignment"
                  onClick={addInfo}
                  data-info={apiResponse.alignment}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Race Bonuses</h2>
              </div>
              <div className="col-sm-12 col-md-8">
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
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                {subraceResponse.ability_bonuses ? (
                  <h2>Sub-Race Bonuses</h2>
                ) : null}
              </div>
              <div className="col-sm-12 col-md-8">
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
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
