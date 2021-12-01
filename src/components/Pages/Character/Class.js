import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export default function Class({
  characterInfo,
  setCharacterInfo,
  proficiencies,
  setProficiencies,
  classapiResponse,
  setClassApiResponse,
  subclassResponse,
  setSubclassResponse,
}) {
  const [classes, setClasses] = useState([]);
  const [subclasses, setSubClasses] = useState([]);

  const fillSubClasses = (e) => {
    setCharacterInfo({
      ...characterInfo,
      class: e.target.value,
      subClass: "None",
    });
    setSubclassResponse([]);
    setSubClasses([]);
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
        if (response.data.subclasses.length === 0) {
          setSubClasses([]);
        } else {
          setSubClasses(response.data.subclasses);
        }
        console.log(response.data);
      });
  };

  const pickSubClass = (e) => {
    if (e.target.value === "Choose Sub-Class") {
      setCharacterInfo({
        ...characterInfo,
        subClass: "None",
      });
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

  const proficienciesControl = (e) => {
    if (proficiencies.includes(e.target.textContent)) {
      setProficiencies([
        proficiencies.filter((items) => {
          return items !== e.target.textContent;
        }),
      ]);
    } else {
      setProficiencies([...proficiencies, e.target.textContent]);
    }
  };

  useEffect(() => {
    axios.get("https://www.dnd5eapi.co/api/classes").then((response) => {
      setClasses(response.data.results);
    });
  }, [!classes]);

  return (
    <div>
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
        <div className="container">
          <div className="classInfo">
            <h1>
              {characterInfo.subClass !== "None"
                ? characterInfo.class + " - " + characterInfo.subClass
                : characterInfo.class}
            </h1>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Hit Die</h2>
              </div>
              <div className="col-sm-12 col-md-8">
                {classapiResponse.hit_die}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Saving Throws</h2>
              </div>
              <div className="col-sm-12 col-md-8">
                {classapiResponse.saving_throws.map((items, index) => {
                  return <p key={index}>{items.name}</p>;
                })}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Proficiency Choices</h2> (choose{" "}
                {classapiResponse.proficiency_choices[0].choose})
              </div>
              <div className="col-sm-12 col-md-8">
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
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h2>Chosen Proficiencies</h2>
              </div>
              <div className="col-sm-12 col-md-8">
                <ul>
                  {proficiencies.map((items, index) => {
                    return <li key={index}>{items}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                {subclassResponse.desc ? <h3>Sub-Class Description</h3> : null}
              </div>
              <div className="col-sm-12 col-md-8">{subclassResponse.desc}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
