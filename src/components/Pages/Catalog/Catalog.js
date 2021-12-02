import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "bootstrap/dist/css/bootstrap.css";
import "./Catalog.css";
import API from "../../../utils/API";


export default function Catalog(props) {

    const { id } = useParams();

    useEffect(() =>{
        API.findCharacter(id).then((res)=>{
            console.log(res)
            setCharacter(res.data)
        })
    },[id])

    const [character,setCharacter] = useState([]);


    // ~~~~~~~~~~~~~~INVENTORY~~~~~~~~~~~~~~//
    const [inventInputs, setInventInputs] = useState({
        name: "",
        type: "",
        description: "",
        properties: "",
        cost: "",
        weight: "",
        armorClass: "",
        strength: "",
        stealth: "",
        damage: "",
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
    const [spellInputs, setSpellInputs] = useState({
        name: "",
        type: "",
        description: "",
        level: "",
        duration: "",
        range: "",
        attack: "",
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
    const [featInputs, setFeatInputs] = useState({
        name: "",
        type: "",
        description: "",
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
    const [profInputs, setProfInputs] = useState({
        name: "",
        type: "",
        description: "",
        subtype: "",
        ability: "",
        script: "",
        typicalSpeakers: "",
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
   
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Add To {character.charName}</h1>
                    <Tabs defaultIndex={0}>
                        <TabList>
                            <Tab>Equipment</Tab>
                            <Tab>Spell</Tab>
                            <Tab>Feature</Tab>
                            <Tab>Proficiency</Tab>
                        </TabList>
                        <TabPanel>
                            <form onSubmit={addInvent}>
                                <label>Name
                                    <input
                                    type="text" 
                                    name="name"
                                    defaultValue={inventInputs.name || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Type
                                    <input
                                    type="text" 
                                    name="type"
                                    defaultValue={inventInputs.type || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Description
                                    <input
                                    type="text" 
                                    name="description"
                                    defaultValue={inventInputs.description || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Properties
                                    <input
                                    type="text" 
                                    name="properties"
                                    defaultValue={inventInputs.properties || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Cost
                                    <input
                                    type="text" 
                                    name="cost"
                                    defaultValue={inventInputs.cost || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Weight
                                    <input
                                    type="text" 
                                    name="weight"
                                    defaultValue={inventInputs.weight || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>armorClass
                                    <input
                                    type="text" 
                                    name="armorClass"
                                    defaultValue={inventInputs.armorClass || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Strength
                                    <input
                                    type="text" 
                                    name="str"
                                    defaultValue={inventInputs.str || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Stealth
                                    <input
                                    type="text" 
                                    name="stealth"
                                    defaultValue={inventInputs.stealth || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <label>Damage
                                    <input
                                    type="text" 
                                    name="damage"
                                    defaultValue={inventInputs.damage || ""}
                                    onChange={handleInventChange}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={addSpell}>
                                <label>Name
                                    <input
                                    type="text" 
                                    name="name"
                                    defaultValue={spellInputs.name || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label>Type
                                    <input
                                    type="text" 
                                    name="type"
                                    defaultValue={spellInputs.type || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label>Description
                                    <input
                                    type="text" 
                                    name="description"
                                    defaultValue={spellInputs.description || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label>Level
                                    <input
                                    type="text" 
                                    name="level"
                                    defaultValue={spellInputs.level || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label>Duration
                                    <input
                                    type="text" 
                                    name="duration"
                                    defaultValue={spellInputs.duration || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label>Range
                                    <input
                                    type="text" 
                                    name="range"
                                    defaultValue={spellInputs.range || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label>Attack
                                    <input
                                    type="text" 
                                    name="attack"
                                    defaultValue={spellInputs.attack || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={addFeat}>
                                <label>Name
                                    <input
                                    type="text" 
                                    name="name"
                                    defaultValue={featInputs.name || ""}
                                    onChange={handleFeatChange}
                                    />
                                </label>
                                <label>Type
                                    <input
                                    type="text" 
                                    name="type"
                                    defaultValue={featInputs.type || ""}
                                    onChange={handleFeatChange}
                                    />
                                </label>
                                <label>Description
                                    <input
                                    type="text" 
                                    name="description"
                                    defaultValue={featInputs.description || ""}
                                    onChange={handleFeatChange}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={addProf}>
                                <label>Name
                                    <input
                                    type="text" 
                                    name="name"
                                    defaultValue={profInputs.name || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label>Type
                                    <input
                                    type="text" 
                                    name="type"
                                    defaultValue={profInputs.type || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label>Description
                                    <input
                                    type="text" 
                                    name="description"
                                    defaultValue={profInputs.description || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label>SubType
                                    <input
                                    type="text" 
                                    name="subtype"
                                    defaultValue={profInputs.subtype || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label>Ability
                                    <input
                                    type="text" 
                                    name="ability"
                                    defaultValue={profInputs.ability || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label>Script
                                    <input
                                    type="text" 
                                    name="script"
                                    defaultValue={profInputs.script || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label>Typical Speakers
                                    <input
                                    type="text" 
                                    name="typicalspeakers"
                                    defaultValue={profInputs.typicalspeakers || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}


