import React, { useState, useEffect } from "react";
import axios from "axios";
import Dice from "../Dice/Dice.js";
import "bootstrap/dist/css/bootstrap.css";
import "./Catalog.css";


export default function Catalog() {

    const [type, setType] = useState([

    ]);

    const [inventInputs, setInventInputs] = ({
        name: '',
        type: '',
        description: '',
        properties: '',
        cost: '',
        weight: '',
        armorClass: '',
        strength: '',
        stealth: '',
        damage: '',
    });

    const handleInventChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInventInputs({...inventInputs, [name]: value})
      }

    const [spellInputs, setSpellInputs] = ({
        name: '',
        type: '',
        description: '',
        level: '',
        duration: '',
        range: '',
        attack: '',
    });

    const handleSpellChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSpellInputs({...spellInputs, [name]: value})
    }  

    const [featInputs, setFeatInputs] = ({
        name: '',
        type: '',
        description: '',
    });




    const [profInputs, setProfInputs] = ({
        name: '',
        type: '',
        subtype: '',
        ability: '',
        script: '',
        typicalSpeakers: '',
    });



    const pickCatalogType = (e) => {
        if (e.target.value === "Equipment") {

        } else if (e.target.value === "Spell") {

        } else if (e.target.value === "Feature") {

        } else if (e.target.value === "Proficiency") {

        } else {

        }
    }





    return (
        <div className="container">
        <h1>Add To Character</h1>

        <form onSubmit={addInvent}>
            <label>Name
                <input
                type="text" 
                name="name"
                value={inventInputs.name || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Type
                <input
                type="text" 
                name="type"
                value={inventInputs.type || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Description
                <input
                type="text" 
                name="description"
                value={inventInputs.description || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Properties
                <input
                type="text" 
                name="properties"
                value={inventInputs.properties || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Cost
                <input
                type="text" 
                name="cost"
                value={inventInputs.cost || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Weight
                <input
                type="text" 
                name="weight"
                value={inventInputs.weight || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>armorClass
                <input
                type="text" 
                name="armorClass"
                value={inventInputs.armorClass || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Strength
                <input
                type="text" 
                name="str"
                value={inventInputs.str || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Stealth
                <input
                type="text" 
                name="stealth"
                value={inventInputs.stealth || ""}
                onChange={handleInventChange}
                />
            </label>
            <label>Damage
                <input
                type="text" 
                name="damage"
                value={inventInputs.damage || ""}
                onChange={handleInventChange}
                />
            </label>
            <input type="submit" />
        </form>
    </div>
    )
}


