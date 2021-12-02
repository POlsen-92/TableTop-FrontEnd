import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from "react-tooltip";
import 'react-tabs/style/react-tabs.css';
import "bootstrap/dist/css/bootstrap.css";
import "./CharacterView.css";
import API from "../../../utils/API";

export default function CharacterView(props) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [inventory,setInventory] = useState([]);
    const [spell,setSpell] = useState([]);
    const [feature,setFeature] = useState([]);
    const [proficiency,setProficiency] = useState([]);
    const [character,setCharacter] = useState([]);
    const [userId,setUserId] = useState('');
    const [userButton, setUserButton] =useState('');

    useEffect(() =>{
        API.findCharacter(id).then((res)=>{
            console.log(res);
            setInventory(res.data.Inventories);
            setSpell(res.data.Spells);
            setFeature(res.data.Features);
            setProficiency(res.data.Proficiencies);
            setUserId(res.data.user_id)
            setCharacter(res.data)
        })
    },[id])

    useEffect(() => {
        if (props.userState.id === userId) {
            setUserButton (
              <Link
                to={{ pathname: `/Profile`}}
                className="d-inline"
              >
                <button data-tip data-for="profile" className="col-2 btn my-1 me-1">User Profile</button>
                <ReactTooltip id="profile"><p>Go to Your Profile</p></ReactTooltip>
              </Link>
            )
        } else {
            setUserButton (
                <Link
                  to={{ pathname: `/profile/${userId}`}}
                  className="d-inline"
                >
                <button data-tip data-for="profile" className="col-2 btn my-1 me-1">User Profile</button>
                <ReactTooltip id="profile"><p>Go to User Profile</p></ReactTooltip>
                </Link>
            )
        }
    },[props.userState.id,userId])

    const campaignPage = () => {
        navigate(`/campaign/${character.Campaign.id}`)
    }

    const addCatalog = () => {
        navigate(`/addCatalog/${id}`)
    }


    // ~~~~~~~~~~~~~~~CHAR INFO EDIT~~~~~~~~~~~~~~~~~~~~
    const [editChar, setEditChar] = useState(false);
    const [nameEdit, setnameEdit] = useState();
    const [ageEdit, setageEdit] = useState();
    const [levelEdit, setlevelEdit] = useState();
    const [alignEdit, setalignEdit] = useState();
    const [bgEdit, setbgEdit] = useState();
    const [persEdit, setpersEdit] = useState();
    const [hpEdit, sethpEdit] = useState();
    const [chpEdit, setchpEdit] = useState();
    const [thpEdit, setthpEdit] = useState();
    const [strEdit, setstrEdit] = useState();
    const [dexEdit, setdexEdit] = useState();
    const [conEdit, setconEdit] = useState();
    const [intEdit, setintEdit] = useState();
    const [wisEdit, setwisEdit] = useState();
    const [chaEdit, setchaEdit] = useState();
    const [spdEdit, setspdEdit] = useState();


    const charSave = () => {
        const charUpdate = {
            charName: nameEdit,
            age: ageEdit,
            level: levelEdit,
            alignment: alignEdit,
            background: bgEdit,
            personality: persEdit,
            hitpoints: hpEdit,
            currhitpoints:chpEdit,
            temphitpoints: thpEdit,
            strength:strEdit,
            dexterity:dexEdit,
            constitution:conEdit,
            intelligence:intEdit,
            wisdom:wisEdit,
            charisma:chaEdit,
            speed:spdEdit,
        }
        console.log(charUpdate)
        console.log(id)
        API.updateCharacter(charUpdate,id, props.token).then((res) => console.log(res));
        setEditChar(false);
        window.location.reload(false)
    }


    // ~~~~~~~~~~~~~~~~~~~~~~PROFICIENCIES EDIT~~~~~~~~~~~~~~~~~//

    const [editProf, setEditProf] = useState(false);
    const [profNameEdit, setprofNameEdit] = useState();
    const [profDescEdit, setprofDescEdit] = useState();
    const [profTypeEdit, setprofTypeEdit] = useState();
    const [profSubTEdit, setprofSubTEdit] = useState();
    const [profAbilityEdit, setprofAbilityEdit] = useState();
    const [profScriptEdit, setprofScriptEdit] = useState();
    const [profTSEdit, setprofTSEdit] = useState();

    const profSave = (profId) => {
        const profUpdate = {
            name: profNameEdit,
            description: profDescEdit,
            type: profTypeEdit,
            subtype: profSubTEdit,
            ability: profAbilityEdit,
            script: profScriptEdit,
            typicalSpeakers: profTSEdit,
        }
        console.log(profUpdate)
        console.log(profId)
        API.updateProficiency(profId, profUpdate, props.token).then((res) => console.log(res));
        setEditProf(false);
        window.location.reload(false)
    }



    // ~~~~~~~~~~~~~~~~~~~~~~FEATURES EDIT~~~~~~~~~~~~~~~~~//

    const [editFeat, setEditFeat] = useState(false);
    const [featNameEdit, setfeatNameEdit] = useState();
    const [featDescEdit, setfeatDescEdit] = useState();
    const [featTypeEdit, setfeatTypeEdit] = useState();


    const featSave = (featId) => {
        const featUpdate = {
            name: featNameEdit,
            description: featDescEdit,
            type: featTypeEdit,
        }
        console.log(featUpdate)
        console.log(featId)
        API.updateFeature(featId, featUpdate, props.token).then((res) => console.log(res));
        setEditFeat(false);
        window.location.reload(false)
    }


    // ~~~~~~~~~~~~~~~~~~~~~~SPELL EDIT~~~~~~~~~~~~~~~~~//

    const [editSpell, setEditSpell] = useState(false);
    const [spellNameEdit, setspellNameEdit] = useState();
    const [spellDescEdit, setspellDescEdit] = useState();
    const [spellTypeEdit, setspellTypeEdit] = useState();
    const [spellLvlEdit, setspellLvlEdit] = useState();
    const [spellDurEdit, setspellDurEdit] = useState();
    const [spellRngeEdit, setspellRngeEdit] = useState();
    const [spellAtkEdit, setspellAtkEdit] = useState();


    const spellSave = (spellId) => {
        const spellUpdate = {
            name: spellNameEdit,
            description: spellDescEdit,
            type: spellTypeEdit,
            level: spellLvlEdit,
            duration: spellDurEdit,
            range: spellRngeEdit,
            attack: spellAtkEdit
        }
        console.log(spellUpdate)
        console.log(spellId)
        API.updateSpell(spellId, spellUpdate, props.token).then((res) => console.log(res));
        setEditSpell(false);
        window.location.reload(false)
    }

    // ~~~~~~~~~~~~~~~~~~~~~~EQUIPMENT EDIT~~~~~~~~~~~~~~~~~//

    const [editEquip, setEditEquip] = useState(false);
    const [equipNameEdit, setequipNameEdit] = useState();
    const [equipDescEdit, setequipDescEdit] = useState();
    const [equipTypeEdit, setequipTypeEdit] = useState();
    const [equipPropEdit, setequipPropEdit] = useState();
    const [equipCostEdit, setequipCostEdit] = useState();
    const [equipWtEdit, setequipWtEdit] = useState();
    const [equipDmgEdit, setequipDmgEdit] = useState();
    const [equipArmEdit, setequipArmEdit] = useState();
    const [equipStrEdit, setequipStrEdit] = useState();
    const [equipStlEdit, setequipStlEdit] = useState();


    const equipSave = (equipId) => {
        const equipUpdate = {
            name: equipNameEdit,
            description: equipDescEdit,
            type: equipTypeEdit,
            properties: equipPropEdit,
            cost: equipCostEdit,
            weight: equipWtEdit,
            damage: equipDmgEdit,
            armorClass: equipArmEdit,
            strength: equipStrEdit,
            stealth: equipStlEdit,
        }
        console.log(equipUpdate)
        console.log(equipId)
        API.updateEquipment(equipId, equipUpdate, props.token).then((res) => console.log(res));
        setEditEquip(false);
        window.location.reload(false)
    }

// RETURN PAGE INFO

    return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        {editChar ? (<input className="row" defaultValue={character.charName} onChange={(e)=>setnameEdit(e.target.value)}/>) : 
                        (<h1 className="row">{character.charName}</h1>)}
                        <button data-tip data-for="catalog" className="col-2 btn my-1 me-1" onClick={addCatalog}>Add to Character</button>
                        <ReactTooltip id="catalog"><p>Add Equipment, Spells, Proficiencies or Features</p></ReactTooltip>
                        {userButton}
                        <button data-tip data-for="campaign" className="col-2 btn my-1 me-1" onClick={campaignPage}>Campaign Page</button>
                        <ReactTooltip id="campaign"><p>Go to Campaign with this Character</p></ReactTooltip>
                    </div>
                    {/* <div className="col">
                        {character.image_content}
                    </div> */}
                    <div className="row">
                        <div className="col">
                        <Tabs defaultIndex={0}>
                            <TabList>
                                <Tab>Information</Tab>
                                <Tab>Proficiencies and Features</Tab>
                                <Tab>Spells</Tab>
                                <Tab>Inventory</Tab>
                            </TabList>
                            {/* CHARACTER INFORMATION */}
                            <TabPanel>
                                <div className="row border">
                                    <div className="col-8">
                                        <h5>Race: {character.race}</h5>
                                        {(character.subrace) ? (
                                            <h5>SubRace: {character.subrace}</h5>
                                        ) : ''}
                                        <h5>Class: {character.class}</h5>
                                        {(character.subclass) ? (
                                            <h5>SubClass: {character.subclass}</h5>
                                        ) : ""}
                                        <h5>Age: {editChar ? (<input className="row" defaultValue={character.age} onChange={(e)=>setageEdit(e.target.value)}/>) : 
                                        (character.age)}</h5>
                                        <h5>Level: {editChar ? (<input className="row" defaultValue={character.level} onChange={(e)=>setlevelEdit(e.target.value)}/>) : 
                                        (character.level)}</h5>
                                        <h5>Alignment: </h5>
                                        {editChar ? (<input className="row" defaultValue={character.alignment} onChange={(e)=>setalignEdit(e.target.value)}/>) : 
                                        (<p>{character.alignment}</p>)}
                                        <h5>Background: {editChar ? (<input className="row" defaultValue={character.background} onChange={(e)=>setbgEdit(e.target.value)}/>) : 
                                        (character.background)}</h5>
                                        <h5>Personality: </h5>
                                        <p>{editChar ? (<input className="row" defaultValue={character.personality} onChange={(e)=>setpersEdit(e.target.value)}/>) : 
                                        (character.personality)}</p>
                                    </div>
                                    <div className="col-4">
                                        <h5>HitPoints: {editChar ? (<input className="row" defaultValue={character.hitpoints} onChange={(e)=>sethpEdit(e.target.value)}/>) : 
                                        (character.hitpoints)}</h5>
                                        <h5>Current HP: {editChar ? (<input className="row" defaultValue={character.currhitpoints} onChange={(e)=>setchpEdit(e.target.value)}/>) : 
                                        (character.currhitpoints)}</h5>
                                        <h5>Temp HP: {editChar ? (<input className="row" defaultValue={character.temphitpoints} onChange={(e)=>setthpEdit(e.target.value)}/>) : 
                                        (character.temphitpoints)}</h5>
                                        <h5>Strength: {editChar ? (<input className="row" defaultValue={character.strength} onChange={(e)=>setstrEdit(e.target.value)}/>) : 
                                        (character.strength)}</h5>
                                        <h5>Dexterity: {editChar ? (<input className="row" defaultValue={character.dexterity} onChange={(e)=>setdexEdit(e.target.value)}/>) : 
                                        (character.dexterity)}</h5>
                                        <h5>Constitution: {editChar ? (<input className="row" defaultValue={character.constitution} onChange={(e)=>setconEdit(e.target.value)}/>) : 
                                        (character.constitution)}</h5>
                                        <h5>Intelligence: {editChar ? (<input className="row" defaultValue={character.intelligence} onChange={(e)=>setintEdit(e.target.value)}/>) : 
                                        (character.intelligence)}</h5>
                                        <h5>Wisdom: {editChar ? (<input className="row" defaultValue={character.wisdom} onChange={(e)=>setwisEdit(e.target.value)}/>) : 
                                        (character.wisdom)}</h5>
                                        <h5>Charisma: {editChar ? (<input className="row" defaultValue={character.charisma} onChange={(e)=>setchaEdit(e.target.value)}/>) : 
                                        (character.charisma)}</h5>
                                        <h5>Speed: {editChar ? (<input className="row" defaultValue={character.speed} onChange={(e)=>setspdEdit(e.target.value)}/>) : 
                                        (character.speed)}</h5>
                                    </div>
                                    {/* SAVE AND DELETE BUTTONS FOR CHARACTER */}
                                    {(character.user_id === props.userState.id) ? (editChar ? 
                                    (<button data-id={character.id} className="col-2 char-edt-btn m-1" onClick={(e)=>charSave()}>Save</button>) :
                                    (<button className="col-2 m-1" onClick={()=>setEditChar(true)}>Edit Character</button>)) : ''}
                                    {(character.user_id === props.userState.id) ? (<button data-id={character.id} className="col-2 char-dlt-btn m-1"
                                    onClick={(e) => {
                                    API.deleteCharacter(e.target.getAttribute("data-id"),props.token).then(navigate(`/Profile`))}}>Delete Character
                                    </button>) : ""}
                                </div>
                            </TabPanel>
                            {/* CHARACTER PROFICIENCIES */}
                            <TabPanel>
                                <div className="row">
                                    <div className="col-6">
                                        <h4>Proficiencies</h4>
                                        <div className="row border">
                                        {proficiency.map((prof)=>{
                                            return(
                                                <div className="col-4" key={(prof.id)}>
                                                    <h5>
                                                        {editProf ? 
                                                        (<input className="row" defaultValue={prof.name} onChange={(e)=>setprofNameEdit(e.target.value)}/>) : 
                                                        (prof.name)}</h5> 
                                                    <h6>Description: </h6>
                                                    <p> {editProf ? 
                                                        (<input className="row" defaultValue={prof.description} onChange={(e)=>setprofDescEdit(e.target.value)}/>) : 
                                                        (prof.description)}</p>
                                                    <h6>Type: {editProf ? (<input className="row" defaultValue={prof.type} onChange={(e)=>setprofTypeEdit(e.target.value)}/>) : 
                                                        (prof.type)}</h6>
                                                    {editProf ? (<h6>SubType: <input className="row" defaultValue={prof.subtype} onChange={(e)=>setprofSubTEdit(e.target.value)}/></h6>)    
                                                        : (prof.subtype ? (<h6>SubType: {prof.subtype}</h6>) : '')}
                                                    <h6>Ability: {editProf ? (<input className="row" defaultValue={prof.ability} onChange={(e)=>setprofAbilityEdit(e.target.value)}/>) : 
                                                        (prof.ability)}</h6>
                                                    <h6>Script: {editProf ? (<input className="row" defaultValue={prof.script} onChange={(e)=>setprofScriptEdit(e.target.value)}/>) : 
                                                        (prof.script)}</h6>
                                                    <h6>Typical Speakers: {editProf ? (<input className="row" defaultValue={prof.typicalSpeakers} onChange={(e)=>setprofTSEdit(e.target.value)}/>) : (prof.typicalSpeakers)}</h6>
                                                {/* EDIT AND DELETE BUTTONS FOR PROFICIENCIES */}
                                                    {(prof.user_id === props.userState.id) ? (editProf ? 
                                                        (<button data-id={prof.id} className="prof-edt-btn m-1" onClick={(e)=>profSave(e.target.getAttribute("data-id"))}>Save</button>) : (<button className="m-1" onClick={()=>setEditProf(true)}>Edit</button>)) : ''}
                                                    {(prof.user_id === props.userState.id) ? (<button data-id={prof.id} className="prof-dlt-btn"
                                                    onClick={(e) => {API.deleteProficiency(e.target.getAttribute("data-id"),props.token).then(window.location.reload(false));}}>Delete </button>) : ""}
                                                </div>
                                            )
                                        })}
                                        </div>
                                    </div>
                                    {/* CHARACTER FEATURES */}
                                    <div className="col-6">
                                        <h4>Features</h4>
                                        <div className="row border">
                                        {feature.map((feat)=>{
                                            return(
                                                <div className="col-4" key={feat.id}>
                                                    <h5>{editFeat ? (<input className="row" defaultValue={feat.name} onChange={(e)=>setfeatNameEdit(e.target.value)}/>) : (feat.name)}</h5>
                                                    
                                                    <h6>Description: </h6>
                                                    <p>{editFeat ? (<input className="row" defaultValue={feat.description} onChange={(e)=>setfeatDescEdit(e.target.value)}/>) : (feat.description)}</p>
                                                    <h6>Type: {editFeat ? (<input className="row" defaultValue={feat.type} onChange={(e)=>setfeatTypeEdit(e.target.value)}/>) : (feat.type)}</h6>
                                                {/* EDIT AND DELETE BUTTONS FOR FEATURES */}
                                                    {(feat.user_id === props.userState.id) ? (editFeat ? 
                                                        (<button data-id={feat.id} className="feat-edt-btn m-1" onClick={(e)=>featSave(e.target.getAttribute("data-id"))}>Save</button>) : (<button className="m-1" onClick={()=>setEditFeat(true)}>Edit</button>)) : ''}
                                                    {(feat.user_id === props.userState.id) ? (<button data-id={feat.id} className="feat-dlt-btn"
                                                    onClick={(e) => {
                                                        API.deleteFeature(e.target.getAttribute("data-id"),props.token).then(window.location.reload(false));}}>Delete
                                                    </button>) : ""}
                                                </div>
                                            )
                                        })}
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            {/* CHARACTER SPELLS */}
                            <TabPanel>
                            <div>
                            <h4>Spells</h4>
                                <div className="row border">
                                {spell.map((spell)=>{
                                    return(
                                        <div className="col-2" key={spell.id}>
                                            <h5>{editSpell ? (<input className="row" defaultValue={spell.name} onChange={(e)=>setspellNameEdit(e.target.value)}/>) : (spell.name)}</h5>
                                            <h6>Desc:</h6>
                                            <p>{editSpell ? (<input className="row" defaultValue={spell.description} onChange={(e)=>setspellDescEdit(e.target.value)}/>) : (spell.description)}</p>
                                            <h6>Type: {editSpell ? (<input className="row" defaultValue={spell.type} onChange={(e)=>setspellTypeEdit(e.target.value)}/>) : (spell.type)}</h6>
                                            <h6>Level: {editSpell ? (<input className="row" defaultValue={spell.level} onChange={(e)=>setspellLvlEdit(e.target.value)}/>) : (spell.level)}</h6>
                                            <h6>Attack: {editSpell ? (<input className="row" defaultValue={spell.attack} onChange={(e)=>setspellAtkEdit(e.target.value)}/>) : (spell.attack)}</h6>
                                            <h6>Duration: {editSpell ? (<input className="row" defaultValue={spell.duration} onChange={(e)=>setspellDurEdit(e.target.value)}/>) : (spell.duration)}</h6>
                                            <h6>Range: {editSpell ? (<input className="row" defaultValue={spell.range} onChange={(e)=>setspellRngeEdit(e.target.value)}/>) : (spell.range)}</h6>
                                        {/* EDIT AND DELETE BUTTONS FOR SPELLS */}
                                            {(spell.user_id === props.userState.id) ? (editSpell ? 
                                                (<button data-id={spell.id} className="spell-edt-btn m-1" onClick={(e)=>spellSave(e.target.getAttribute("data-id"))}>Save</button>) : (<button className="m-1" onClick={()=>setEditSpell(true)}>Edit</button>)) : ''}
                                            {(spell.user_id === props.userState.id) ? (<button data-id={spell.id} className="spell-dlt-btn"
                                            onClick={(e) => {
                                                API.deleteSpell(e.target.getAttribute("data-id"),props.token).then(window.location.reload(false));}}>Delete
                                            </button>) : ""}
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                            </TabPanel>
                            {/* CHARACTER EQUIPMENT */}
                            <TabPanel>
                            <div>
                            <h4>Equipment</h4>
                                <div className="row border">
                                {inventory.map((equip)=>{
                                    return(
                                        <div className="col-2" key={equip.id}>
                                            <h5>{editEquip ? (<input className="row" defaultValue={equip.name} onChange={(e)=>setequipNameEdit(e.target.value)}/>) : (equip.name)}</h5>
                                            <h6>Desc: </h6>
                                            <p>{editEquip ? (<input className="row" defaultValue={equip.description} onChange={(e)=>setequipDescEdit(e.target.value)}/>) : (equip.description)}</p>
                                            <h6>Type: {editEquip ? (<input className="row" defaultValue={equip.type} onChange={(e)=>setequipTypeEdit(e.target.value)}/>) : (equip.type)}</h6>
                                            <h6>Properties: {editEquip ? (<input className="row" defaultValue={equip.properties} onChange={(e)=>setequipPropEdit(e.target.value)}/>) : (equip.properties)}</h6>
                                            <h6>Cost: {editEquip ? (<input className="row" defaultValue={equip.cost} onChange={(e)=>setequipCostEdit(e.target.value)}/>) : (equip.cost)}</h6>
                                            <h6>Weight: {editEquip ? (<input className="row" defaultValue={equip.weight} onChange={(e)=>setequipWtEdit(e.target.value)}/>) : (equip.weight)}</h6>
                                            <h6>Damage: {editEquip ? (<input className="row" defaultValue={equip.damage} onChange={(e)=>setequipDmgEdit(e.target.value)}/>) : (equip.damage)}</h6>
                                            <h6>Armor Class: {editEquip ? (<input className="row" defaultValue={equip.armorClass} onChange={(e)=>setequipArmEdit(e.target.value)}/>) : (equip.armorClass)}</h6>
                                            <h6>Strength: {editEquip ? (<input className="row" defaultValue={equip.strength} onChange={(e)=>setequipStrEdit(e.target.value)}/>) : (equip.strength)}</h6>
                                            <h6>Stealth: {editEquip ? (<input className="row" defaultValue={equip.stealth} onChange={(e)=>setequipStlEdit(e.target.value)}/>) : (equip.stealth)}</h6>
                                        {/* EDIT AND DELETE BUTTONS FOR EQUIPMENT */}
                                            {(equip.user_id === props.userState.id) ? (editEquip ? 
                                            (<button data-id={equip.id} className="equip-edt-btn m-1" onClick={(e)=>equipSave(e.target.getAttribute("data-id"))}>Save</button>) : (<button className="m-1" onClick={()=>setEditEquip(true)}>Edit</button>)) : ''}
                                            {(equip.user_id === props.userState.id) ? (<button data-id={equip.id} className="equip-dlt-btn"
                                            onClick={(e) => {
                                                API.deleteEquipment(e.target.getAttribute("data-id"),props.token).then(window.location.reload(false));}}>Delete
                                            </button>) : ""}
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                            </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}