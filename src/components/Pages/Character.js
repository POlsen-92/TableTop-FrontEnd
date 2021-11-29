import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import { Link } from "react-router-dom";
import API from "../../utils/API"

function Character() {

    const [inputs, setInputs] = useState({
        charName: "",
        race: "",
        clas: "",
        str: "",
        dex: "",
        cons: "",
        int: "",
        wis: "",
        char: "",
        armor: "",
        init: "",
        speed: "",
        hp: "",
        tempHP: "",
        atks: "",
        pers: "",
        feat: "",
    });

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs({...inputs, [name]: value})
    }

    const addCharacter = (e) => {
        e.preventDefault();
        console.log(inputs)
      }

    return (
    <div className="container">
        <h1>New Character</h1>

        <form onSubmit={addCharacter}>
            <label>Character Name
                <input
                type="text" 
                name="charName"
                value={inputs.charName || ""}
                onChange={handleChange}
                />
            </label>
            <label>Race
                <input
                type="text" 
                name="race"
                value={inputs.race || ""}
                onChange={handleChange}
                />
            </label>
            <label>Class
                <input
                type="text" 
                name="clas"
                value={inputs.clas || ""}
                onChange={handleChange}
                />
            </label>
            <label>Strength
                <input
                type="text" 
                name="str"
                value={inputs.str || ""}
                onChange={handleChange}
                />
            </label>
            <label>Dexterity
                <input
                type="text" 
                name="dex"
                value={inputs.dex || ""}
                onChange={handleChange}
                />
            </label>
            <label>Constitution
                <input
                type="text" 
                name="cons"
                value={inputs.cons || ""}
                onChange={handleChange}
                />
            </label>
            <label>Intelligence
                <input
                type="text" 
                name="int"
                value={inputs.int || ""}
                onChange={handleChange}
                />
            </label>
            <label>Wisdom
                <input
                type="text" 
                name="wis"
                value={inputs.wis || ""}
                onChange={handleChange}
                />
            </label>
            <label>Charisma
                <input
                type="text" 
                name="char"
                value={inputs.char || ""}
                onChange={handleChange}
                />
            </label>
            <label>Armor
                <input
                type="text" 
                name="armor"
                value={inputs.armor || ""}
                onChange={handleChange}
                />
            </label>
            <label>Initiative
                <input
                type="text" 
                name="init"
                value={inputs.init || ""}
                onChange={handleChange}
                />
            </label>
            <label>Speed
                <input
                type="text" 
                name="speed"
                value={inputs.speed || ""}
                onChange={handleChange}
                />
            </label>
            <label>HitPoints
                <input
                type="text" 
                name="hp"
                value={inputs.hp || ""}
                onChange={handleChange}
                />
            </label>
            <label>Temp HitPoints
                <input
                type="text" 
                name="tempHP"
                value={inputs.tempHP || ""}
                onChange={handleChange}
                />
            </label>
            <label>Attacks & SpellCasting
                <input
                type="text" 
                name="atks"
                value={inputs.atks || ""}
                onChange={handleChange}
                />
            </label>
            <label>Personality/Ideals/Flaws
                <input
                type="text" 
                name="pers"
                value={inputs.pers || ""}
                onChange={handleChange}
                />
            </label>
            <label>Features/Traits
                <input
                type="text" 
                name="feat"
                value={inputs.feat || ""}
                onChange={handleChange}
                />
            </label>
            <input type="submit" />
        </form>
    </div>
    );
  }
  
  export default Character;