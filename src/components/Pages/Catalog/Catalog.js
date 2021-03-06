import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from "react-tooltip";
import 'react-tabs/style/react-tabs.css';
import API from "../../../utils/API";
import "bootstrap/dist/css/bootstrap.css";
import "./Catalog.css"


export default function Catalog(props) {
// GET INFORMATION ON PAGE LOAD 
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() =>{
        API.findCharacter(id).then((res)=>{
            setCharacter(res.data)
        })
    },[id])

    const [character,setCharacter] = useState([]);

    const characterPage = () => {
        navigate(`/character/${id}`)
    }

// ~~~~~~~~~~~~~~INVENTORY~~~~~~~~~~~~~~//
    const [equipInputs, setEquipInputs] = useState({
        name: "",
        type: "",
        description: "",
        properties: "",
        cost: 0,
        weight: 0,
        armorClass: 0,
        strength: 0,
        stealth: 0,
        damage: 0,
    });

    const handleEquipChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEquipInputs({...equipInputs, [name]: value})
      }

    const addEquip = (e) => {
        e.preventDefault();
        API.createEquipment(id,equipInputs,props.token)
         .then(() => {
             window.location.reload(false)
         })
         .catch((err) => {
             console.log(err)
         })
    }

// ~~~~~~~~~~~~~~SPELLS~~~~~~~~~~~~~~//
    const [spellInputs, setSpellInputs] = useState({
        name: "",
        type: "",
        description: "",
        level: "",
        duration: "",
        range: "",
        attack: 0,
    });

    const handleSpellChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSpellInputs({...spellInputs, [name]: value})
    }  

    const addSpell = (e) => {
        e.preventDefault();
        API.createSpell(id,spellInputs,props.token)
        .then(() => {
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err)
        })
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
        API.createFeature(id,featInputs,props.token)
        .then(() => {
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err)
        })
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
        API.createNewProficiency(id,profInputs,props.token)
        .then(() => {
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err)
        })
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
                            {/* EQUIPMENT TAB */}
                            <form onSubmit={addEquip}>
                                <label className="mx-2">Name
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="name"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Type
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="type"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Properties
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="properties"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Cost
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="cost"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Weight
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="weight"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Armor Class
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="armorClass"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Strength
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="str"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Stealth
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="stealth"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label>
                                <label className="mx-2">Damage
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="damage"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label><br />
                                <label className="mx-2">Description
                                <br /><textarea
                                    className="inputColor w-100"
                                    name="description"
                                    type="text"
                                    defaultValue=""
                                    onChange={handleEquipChange}
                                    />
                                </label> <br />
                                <button type="submit" className="col-2 btn my-1 me-1" >Submit</button>
                                <button data-tip data-for="character" className="col-2 btn my-1 me-1" onClick={characterPage}>Back</button>
                                <ReactTooltip id="character"><p>Go Back to Character Sheet</p></ReactTooltip>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={addSpell}>
                                <label className="mx-2">Name
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="name"
                                    defaultValue={spellInputs.name || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label className="mx-2">Type
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="type"
                                    defaultValue={spellInputs.type || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label className="mx-2">Level
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="level"
                                    defaultValue={spellInputs.level || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label className="mx-2">Duration
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="duration"
                                    defaultValue={spellInputs.duration || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label className="mx-2">Range
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="range"
                                    defaultValue={spellInputs.range || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label>
                                <label className="mx-2">Attack
                                <br /><input
                                    className="inputColor"
                                    type="number" 
                                    name="attack"
                                    defaultValue={spellInputs.attack || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label><br />
                                <label className="mx-2">Description
                                <br /><textarea
                                    className="inputColor w-100"
                                    type="text" 
                                    name="description"
                                    defaultValue={spellInputs.description || ""}
                                    onChange={handleSpellChange}
                                    />
                                </label><br />
                                <button type="submit" className="col-2 btn my-1 me-1" >Submit</button>
                                <button data-tip data-for="character" className="col-2 btn my-1 me-1" onClick={characterPage}>Back</button>
                                <ReactTooltip id="character"><p>Go Back to Character Sheet</p></ReactTooltip>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={addFeat}>
                                <label className="mx-2">Name
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="name"
                                    defaultValue={featInputs.name || ""}
                                    onChange={handleFeatChange}
                                    />
                                </label> <br />
                                <label className="mx-2">Type
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="type"
                                    defaultValue={featInputs.type || ""}
                                    onChange={handleFeatChange}
                                    />
                                </label> <br />
                                <label className="mx-2">Description
                                <br /><textarea
                                    className="inputColor"
                                    type="text" 
                                    name="description"
                                    defaultValue={featInputs.description || ""}
                                    onChange={handleFeatChange}
                                    />
                                </label> <br />
                                <button type="submit" className="col-2 btn my-1 me-1" >Submit</button>
                                <button data-tip data-for="character" className="col-2 btn my-1 me-1" onClick={characterPage}>Back</button>
                                <ReactTooltip id="character"><p>Go Back to Character Sheet</p></ReactTooltip>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={addProf}>
                                <label className="mx-2">Name
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="name"
                                    defaultValue={profInputs.name || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label className="mx-2">Type
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="type"
                                    defaultValue={profInputs.type || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label className="mx-2">SubType
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="subtype"
                                    defaultValue={profInputs.subtype || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label className="mx-2">Ability
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="ability"
                                    defaultValue={profInputs.ability || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label className="mx-2">Script
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="script"
                                    defaultValue={profInputs.script || ""}
                                    onChange={handleProfChange}
                                    />
                                </label>
                                <label className="mx-2">Typical Speakers
                                <br /><input
                                    className="inputColor"
                                    type="text" 
                                    name="typicalspeakers"
                                    defaultValue={profInputs.typicalSpeakers || ""}
                                    onChange={handleProfChange}
                                    />
                                </label><br />
                                <label className="mx-2">Description
                                <br /><textarea
                                    className="inputColor"
                                    type="text" 
                                    name="description"
                                    defaultValue={profInputs.description || ""}
                                    onChange={handleProfChange}
                                    />
                                </label><br />
                                <button type="submit" className="col-2 btn my-1 me-1" >Submit</button>
                                <button data-tip data-for="character" className="col-2 btn my-1 me-1" onClick={characterPage}>Back</button>
                                <ReactTooltip id="character"><p>Go Back to Character Sheet</p></ReactTooltip>
                            </form>
                        </TabPanel>
                    </Tabs>
                    <div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}


