import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
// import reactDom from "react-dom";

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
    if(document.getElementById("subclass")) {
      document.getElementById("subclass").selectedIndex = 0;
    }
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
    if (proficiencies.includes(e.target.value)) {
      setProficiencies(
        proficiencies.filter((items) => {
          return items !== e.target.value;
        })
      );
    } else {
      if (
        classapiResponse.proficiency_choices[0].choose > proficiencies.length
      ) {
        const temp = [...proficiencies];
        temp.push(e.target.value);
        setProficiencies(temp);
        console.log(temp);
      }
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
          <select id="subclass" onChange={pickSubClass}>
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
            <h2>
              {characterInfo.subClass !== "None"
                ? characterInfo.class + " - " + characterInfo.subClass
                : characterInfo.class}
            </h2>
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
                <div className="row">
                  <div id="tooltip" className="col-sm-12 col-md-6">
                    <ul onClick={proficienciesControl}>
                      {classapiResponse.proficiency_choices[0].from.map(
                        (items, index) => {
                          return (
                            // <div key={index} data-tip data-for={items.index}>
                            <button
                              data-tip
                              data-for={items.index}
                              value={items.name}
                              key={index}
                            >
                              {items.name}
                            </button>
                            // </div>
                          );
                        }
                      )}
                    </ul>
                    <ReactTooltip className="tooltip" id="skill-acrobatics">
                      <p>
                        Your Dexterity (Acrobatics) check covers your attempt to
                        stay on your feet <br />
                        in a tricky situation, such as when you're trying to run
                        across a sheet of ice, <br />
                        balance on a tightrope, or stay upright on a rocking
                        ship's deck. The GM might <br />
                        also call for a Dexterity (Acrobatics) check to see if
                        you can perform acrobatic <br />
                        stunts, including dives, rolls, somersaults, and flips.
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-animal-handling">
                      <p>
                        When there is any question whether you can calm down a
                        domesticated animal, <br />
                        keep a mount from getting spooked, or intuit an animal's
                        intentions, the GM might <br />
                        call for a Wisdom (Animal Handling) check. You also make
                        a Wisdom (Animal Handling) <br />
                        check to control your mount when you attempt a risky
                        maneuver.
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-arcana">
                      <p>
                        Your Intelligence (Arcana) check measures your ability
                        to recall lore about spells, <br />
                        magic items, eldritch symbols, magical traditions, the
                        planes of existence, and the <br />
                        inhabitants of those planes.
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-athletics">
                      <p>
                        Your Strength (Athletics) check covers difficult
                        situations you encounter while <br />
                        climbing, jumping, or swimming.
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-deception">
                      <p>
                        Your Charisma (Deception) check determines whether you
                        can convincingly hide the <br />
                        truth, either verbally or through your actions. This
                        deception can encompass everything <br />
                        from misleading others through ambiguity to telling
                        outright lies. Typical situations <br />
                        include trying to fast- talk a guard, con a merchant,
                        earn money through gambling, pass <br />
                        yourself off in a disguise, dull someone's suspicions
                        with false assurances, or maintain a <br />
                        straight face while telling a blatant lie.
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-history">
                      <p>
                        "Your Intelligence (History) check measures your ability
                        to recall lore about historical <br />
                        events, legendary people, ancient kingdoms, past
                        disputes, recent wars, and lost civilizations."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip  className="tooltip"id="skill-insight">
                      <p>
                        "Your Wisdom (Insight) check decides whether you can
                        determine the true intentions of a <br />
                        creature, such as when searching out a lie or predicting
                        someone's next move. Doing so involves <br />
                        gleaning clues from body language, speech habits, and
                        changes in mannerisms."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-intimidation">
                      <p>
                        "When you attempt to influence someone through overt
                        threats, hostile actions, and physical <br />
                        violence, the GM might ask you to make a Charisma
                        (Intimidation) check. Examples include trying to <br />
                        pry information out of a prisoner, convincing street
                        thugs to back down from a confrontation, or <br />
                        using the edge of a broken bottle to convince a sneering
                        vizier to reconsider a decision."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-investigation">
                      <p>
                        "When you look around for clues and make deductions
                        based on those clues, you make an <br />
                        Intelligence (Investigation) check. You might deduce the
                        location of a hidden object, discern from <br />
                        the appearance of a wound what kind of weapon dealt it,
                        or determine the weakest point in a tunnel <br />
                        that could cause it to collapse. Poring through ancient
                        scrolls in search of a hidden fragment of <br />
                        knowledge might also call for an Intelligence
                        (Investigation) check."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-medicine">
                      <p>
                        "A Wisdom (Medicine) check lets you try to stabilize a
                        dying companion or diagnose an illness."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-nature">
                      <p>
                        "Your Intelligence (Nature) check measures your ability
                        to recall lore about terrain, plants <br />
                        and animals, the weather, and natural cycles."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-perception">
                      <p>
                        "Your Wisdom (Perception) check lets you spot, hear, or
                        otherwise detect the presence of something. <br />
                        It measures your general awareness of your surroundings
                        and the keenness of your senses. For example, <br />
                        you might try to hear a conversation through a closed
                        door, eavesdrop under an open window, or hear <br />
                        monsters moving stealthily in the forest. Or you might
                        try to spot things that are obscured or easy <br />
                        to miss, whether they are orcs lying in ambush on a
                        road, thugs hiding in the shadows of an alley, <br />
                        or candlelight under a closed secret door."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-performance">
                      <p>
                        "Your Charisma (Performance) check determines how well
                        you can delight an audience with music, <br />
                        dance, acting, storytelling, or some other form of
                        entertainment."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-persuasion">
                      <p>
                        "When you attempt to influence someone or a group of
                        people with tact, social graces, or good <br />
                        nature, the GM might ask you to make a Charisma
                        (Persuasion) check. Typically, you use persuasion <br />
                        when acting in good faith, to foster friendships, make
                        cordial requests, or exhibit proper etiquette. <br />
                        Examples of persuading others include convincing a
                        chamberlain to let your party see the king, <br />
                        negotiating peace between warring tribes, or inspiring a
                        crowd of townsfolk."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-religion">
                      <p>
                        "Your Intelligence (Religion) check measures your
                        ability to recall lore about deities, rites <br />
                        and prayers, religious hierarchies, holy symbols, and
                        the practices of secret cults."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-sleight-of-hand">
                      <p>
                        "Whenever you attempt an act of legerdemain or manual
                        trickery, such as planting something on <br />
                        someone else or concealing an object on your person,
                        make a Dexterity (Sleight of Hand) check. The <br />
                        GM might also call for a Dexterity (Sleight of Hand)
                        check to determine whether you can lift a coin <br />
                        purse off another person or slip something out of
                        another person's pocket."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-stealth">
                      <p>
                        "Make a Dexterity (Stealth) check when you attempt to
                        conceal yourself from enemies, slink past <br />
                        guards, slip away without being noticed, or sneak up on
                        someone without being seen or heard."
                      </p>
                    </ReactTooltip>
                    <ReactTooltip className="tooltip" id="skill-survival">
                      <p>
                        "The GM might ask you to make a Wisdom (Survival) check
                        to follow tracks, hunt wild game, guide <br />
                        your group through frozen wastelands, identify signs
                        that owlbears live nearby, predict the weather, <br />
                        or avoid quicksand and other natural hazards."
                      </p>
                    </ReactTooltip>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <ul>
                      {proficiencies.map((items, index) => {
                        return <li key={index}>{items}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                {subclassResponse.desc ? <h2>Sub-Class Description</h2> : null}
              </div>
              <div className="col-sm-12 col-md-8">{subclassResponse.desc}</div>
            </div>
          </div>
        </div>
      ) : null}
      <br/>
    </div>
  );
}
