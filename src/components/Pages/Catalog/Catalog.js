import React, { useState, useEffect } from "react";
import axios from "axios";
import Dice from "../Dice/Dice.js";
import "bootstrap/dist/css/bootstrap.css";
import "./Catalog.css";


export default function Catalog() {



    // ~~~~~~~~~~~~~~INVENTORY~~~~~~~~~~~~~~//
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

    const addInvent = (e) => {
        e.preventDefault();
        console.log(inventInputs)
    }

    // ~~~~~~~~~~~~~~SPELLS~~~~~~~~~~~~~~//
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

    const addSpell = (e) => {
        e.preventDefault();
        console.log(spellInputs)
    }

    // ~~~~~~~~~~~~~~FEATURES~~~~~~~~~~~~~~//
    const [featInputs, setFeatInputs] = ({
        name: '',
        type: '',
        description: '',
    });

    const handleFeatChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFeatInputs({...featInputs, [name]: value})
    }  

    const addFeat = (e) => {
        e.preventDefault();
        console.log(featInputs)
    }

    // ~~~~~~~~~~~~~~PROFICIENCIES~~~~~~~~~~~~~~//
    const [profInputs, setProfInputs] = ({
        name: '',
        type: '',
        description: '',
        subtype: '',
        ability: '',
        script: '',
        typicalSpeakers: '',
    });

    const handleProfChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProfInputs({...profInputs, [name]: value})
    }  

    const addProf = (e) => {
        e.preventDefault();
        console.log(profInputs)
    }

// ~~~~~~~~~~~~~~CHOICES~~~~~~~~~~~~~~//
    const pickCatalogType = (e) => {
        if (e.target.value === "Equipment") {
            return (
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
            )
        } else if (e.target.value === "Spell") {
            return (
                <form onSubmit={addSpell}>
                    <label>Name
                        <input
                        type="text" 
                        name="name"
                        value={spellInputs.name || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <label>Type
                        <input
                        type="text" 
                        name="type"
                        value={spellInputs.type || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <label>Description
                        <input
                        type="text" 
                        name="description"
                        value={spellInputs.description || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <label>Level
                        <input
                        type="text" 
                        name="level"
                        value={spellInputs.level || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <label>Duration
                        <input
                        type="text" 
                        name="duration"
                        value={spellInputs.duration || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <label>Range
                        <input
                        type="text" 
                        name="range"
                        value={spellInputs.range || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <label>Attack
                        <input
                        type="text" 
                        name="attack"
                        value={spellInputs.attack || ""}
                        onChange={handleSpellChange}
                        />
                    </label>
                    <input type="submit" />
                </form>
            )
        } else if (e.target.value === "Feature") {
            return (
                <form onSubmit={addFeat}>
                    <label>Name
                        <input
                        type="text" 
                        name="name"
                        value={featInputs.name || ""}
                        onChange={handleFeatChange}
                        />
                    </label>
                    <label>Type
                        <input
                        type="text" 
                        name="type"
                        value={featInputs.type || ""}
                        onChange={handleFeatChange}
                        />
                    </label>
                    <label>Description
                        <input
                        type="text" 
                        name="description"
                        value={featInputs.description || ""}
                        onChange={handleFeatChange}
                        />
                    </label>
                    <input type="submit" />
                </form>
            )
        } else if (e.target.value === "Proficiency") {
            return (
                <form onSubmit={addProf}>
                    <label>Name
                        <input
                        type="text" 
                        name="name"
                        value={profInputs.name || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <label>Type
                        <input
                        type="text" 
                        name="type"
                        value={profInputs.type || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <label>Description
                        <input
                        type="text" 
                        name="description"
                        value={profInputs.description || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <label>SubType
                        <input
                        type="text" 
                        name="subtype"
                        value={profInputs.subtype || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <label>Ability
                        <input
                        type="text" 
                        name="ability"
                        value={profInputs.ability || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <label>Script
                        <input
                        type="text" 
                        name="script"
                        value={profInputs.script || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <label>Typical Speakers
                        <input
                        type="text" 
                        name="typicalspeakers"
                        value={profInputs.typicalspeakers || ""}
                        onChange={handleProfChange}
                        />
                    </label>
                    <input type="submit" />
                </form>
            )
        } else {

        }
    }



// ~~~~~~~~~~~~~~PAGE SHEET~~~~~~~~~~~~~~//

    return (
        <div className="container">
        <h1>Add To Character</h1>

        
    </div>
    )
}


