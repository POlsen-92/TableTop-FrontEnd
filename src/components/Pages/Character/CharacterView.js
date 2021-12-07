import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Editor } from "@tinymce/tinymce-react";
import ReactTooltip from "react-tooltip";
import API from "../../../utils/API";
import DOMPurify from "dompurify";
import 'react-tabs/style/react-tabs.css';
import "bootstrap/dist/css/bootstrap.css";

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
            setInventory(res.data.Inventories);
            setSpell(res.data.Spells);
            setFeature(res.data.Features);
            setProficiency(res.data.Proficiencies);
            setUserId(res.data.user_id)
            setCharacter(res.data)           
        })
    },[id])

    useEffect(()=>{
        if(character.background) {
            setCharacter({...character,background: DOMPurify.sanitize(character.background)})
        }
        if(character.personality) {
            setCharacter({...character,personality: DOMPurify.sanitize(character.personality)})
        }
        if(character.alignment) {
            setCharacter({...character,alignment: DOMPurify.sanitize(character.alignment)})
        }
    },[])

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
        API.updateCharacter(charUpdate,id, props.token);
        setEditChar(false);
        window.location.reload(false)
    }

    const deleteChar = () => {
        if (window.confirm("Do You Really Want to Delete Your Character?")) {
            API.deleteCharacter(id,props.token)
            .then(()=>{
                alert("Character has been Deleted")
                navigate(`/Profile`)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert("Character has Not Been Deleted")
        }
    }


    // ~~~~~~~~~~~~~~~~~~~~~~PROFICIENCIES EDIT~~~~~~~~~~~~~~~~~//

    const [editProf, setEditProf] = useState();
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

        API.updateProficiency(profId, profUpdate, props.token)
        setEditProf();
        window.location.reload(false)
    }

    const deleteProf = (profId) => {
        if (window.confirm("Do You Really Want to Delete This Proficiency?")) {
            API.deleteProficiency(profId,props.token).then(()=>{
                window.location.reload(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert("Proficiency has Not Been Deleted")
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~FEATURES EDIT~~~~~~~~~~~~~~~~~//

    const [editFeat, setEditFeat] = useState();
    const [featNameEdit, setfeatNameEdit] = useState();
    const [featDescEdit, setfeatDescEdit] = useState();
    const [featTypeEdit, setfeatTypeEdit] = useState();


    const featSave = (featId) => {
        const featUpdate = {
            name: featNameEdit,
            description: featDescEdit,
            type: featTypeEdit,
        }
        API.updateFeature(featId, featUpdate, props.token)
        setEditFeat();
        window.location.reload(false)
    }

    const deleteFeat = (featId) => {
        if (window.confirm("Do You Really Want to Delete This Feature?")) {
            API.deleteFeature(featId,props.token)
            .then(()=>{
                window.location.reload(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert("Feature has Not Been Deleted")
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~SPELL EDIT~~~~~~~~~~~~~~~~~//

    const [editSpell, setEditSpell] = useState();
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
        API.updateSpell(spellId, spellUpdate, props.token)
        setEditSpell();
        window.location.reload(false)
    }

    const deleteSpell = (spellId) => {
        if (window.confirm("Do You Really Want to Delete This Spell?")) {
            API.deleteSpell(spellId,props.token)
            .then(()=>{
                window.location.reload(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert("Spell has Not Been Deleted")
        }
    }


    // ~~~~~~~~~~~~~~~~~~~~~~EQUIPMENT EDIT~~~~~~~~~~~~~~~~~//

    const [editEquip, setEditEquip] = useState();
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
        API.updateEquipment(equipId, equipUpdate, props.token)
        setEditEquip();
        window.location.reload(false)
    }

    const deleteEquip = (equipId) => {
        if (window.confirm("Do You Really Want to Delete This Item?")) {
            API.deleteEquipment(equipId,props.token)
            .then(()=>{
                window.location.reload(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert("Item has Not Been Deleted")
        }
    }


// RETURN PAGE INFO

    return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        {/* CHARACTER NAME AND BUTTONS */}
                        {editChar ? (<input className="row my-2 py-1 h1 inputColor" defaultValue={character.charName} onChange={(e)=>setnameEdit(e.target.value)}/>) : 
                        (<h1 className="row">{character.charName}</h1>)}
                        {(character.user_id === props.userState.id) ? (<button data-tip data-for="catalog" className="col-2 btn my-1 me-1" onClick={addCatalog}>Add to Character</button>) : ""}
                        <ReactTooltip id="catalog"><p>Add Equipment, Spells, Proficiencies or Features</p></ReactTooltip>
                        {userButton}
                        <button data-tip data-for="campaign" className="col-2 btn my-1 me-1" onClick={campaignPage}>Campaign Page</button>
                        <ReactTooltip id="campaign"><p>Go to Campaign with this Character</p></ReactTooltip>
                    </div>
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
                                        <h5 className="py-2">Race: {character.race}</h5>
                                        {(character.subrace) ? (
                                            <h5 className="py-2">SubRace: {character.subrace}</h5>
                                        ) : ''}
                                        <h5 className="py-2">Class: {character.class}</h5>
                                        {(character.subclass) ? (
                                            <h5 className="py-2">SubClass: {character.subclass}</h5>
                                        ) : ""}
                                        <h5 className="py-2">Age: {editChar ? (<input className="row inputColor" defaultValue={character.age} onChange={(e)=>setageEdit(e.target.value)}/>) : 
                                        (character.age)}</h5>
                                        <h5 className="py-2">Level: {editChar ? (<input className="row inputColor" defaultValue={character.level} onChange={(e)=>setlevelEdit(e.target.value)}/>) : 
                                        (character.level)}</h5>
                                        <h5 className="py-2">Alignment: </h5>
                                        {editChar ? (
                                            <div>
                                                <Editor
                                                    initialValue={character.alignment}
                                                    apiKey={process.env.REACT_APP_TINYAPI}
                                                    init={{
                                                    height: 200,
                                                    width: "60%",
                                                    menubar: true,
                                                    skin: "oxide-dark",
                                                    content_css: "dark",
                                                    plugins: [
                                                        "advlist autolink lists link image",
                                                        "charmap print preview anchor help",
                                                        "searchreplace visualblocks code",
                                                        "insertdatetime media paste wordcount",
                                                    ],
                                                    toolbar:
                                                        "undo redo | formatselect | bold italic | \
                                                        alignleft aligncenter alignright | \
                                                        bullist numlist outdent indent image | help",
                                                    }}
                                                    onChange={(e) => setalignEdit(e.target.getContent())}
                                                />
                                            </div>
                                        ) : 
                                        (<span dangerouslySetInnerHTML={{__html: character.alignment}}></span>)}
                                        <h5 className="py-2">Background: </h5>
                                            <p>
                                                {editChar ? (
                                                    <div>
                                                <Editor
                                                    initialValue={character.background}
                                                    apiKey={process.env.REACT_APP_TINYAPI}
                                                    init={{
                                                        height: 200,
                                                        width: "60%",
                                                        menubar: true,
                                                        skin: "oxide-dark",
                                                        content_css: "dark",
                                                        plugins: [
                                                        "advlist autolink lists link image",
                                                        "charmap print preview anchor help",
                                                        "searchreplace visualblocks code",
                                                        "insertdatetime media paste wordcount",
                                                    ],
                                                    toolbar:
                                                    "undo redo | formatselect | bold italic | \
                                                    alignleft aligncenter alignright | \
                                                    bullist numlist outdent indent image | help",
                                                }}
                                                onChange={(e) => setbgEdit(e.target.getContent())}
                                                />
                                            </div>
                                        ) : 
                                        (<span dangerouslySetInnerHTML={{__html: character.background}}></span>)}
                                            </p>
                                        <h5 className="py-2">Personality: </h5>
                                        <p>{editChar ? (
                                            <div>
                                                <Editor
                                                    initialValue={character.personality}
                                                    apiKey={process.env.REACT_APP_TINYAPI}
                                                    init={{
                                                    height: 200,
                                                    width: "60%",
                                                    menubar: true,
                                                    skin: "oxide-dark",
                                                    content_css: "dark",
                                                    plugins: [
                                                        "advlist autolink lists link image",
                                                        "charmap print preview anchor help",
                                                        "searchreplace visualblocks code",
                                                        "insertdatetime media paste wordcount",
                                                    ],
                                                    toolbar:
                                                        "undo redo | formatselect | bold italic | \
                                                        alignleft aligncenter alignright | \
                                                        bullist numlist outdent indent image | help",
                                                    }}
                                                    onChange={(e) => setpersEdit(e.target.getContent())}
                                                />
                                            </div>
                                        ) : 
                                        (<span dangerouslySetInnerHTML={{__html: character.personality}}></span>)}</p>
                                    </div>
                                    {/* CHARACTER ATTRIBUTES */}
                                    <div className="col-4">
                                        <h5 className="py-2">HitPoints: {editChar ? (<input className="row inputColor" defaultValue={character.hitpoints} onChange={(e)=>sethpEdit(e.target.value)}/>) : 
                                        (character.hitpoints)}</h5>
                                        <h5 className="py-2">Current HP: {editChar ? (<input className="row inputColor" defaultValue={character.currhitpoints} onChange={(e)=>setchpEdit(e.target.value)}/>) : 
                                        (character.currhitpoints)}</h5>
                                        <h5 className="py-2">Temp HP: {editChar ? (<input className="row inputColor" defaultValue={character.temphitpoints} onChange={(e)=>setthpEdit(e.target.value)}/>) : 
                                        (character.temphitpoints)}</h5>
                                        <h5 className="py-2">Strength: {editChar ? (<input className="row inputColor" defaultValue={character.strength} onChange={(e)=>setstrEdit(e.target.value)}/>) : 
                                        (character.strength)}</h5>
                                        <h5 className="py-2">Dexterity: {editChar ? (<input className="row inputColor" defaultValue={character.dexterity} onChange={(e)=>setdexEdit(e.target.value)}/>) : 
                                        (character.dexterity)}</h5>
                                        <h5 className="py-2">Constitution: {editChar ? (<input className="row inputColor" defaultValue={character.constitution} onChange={(e)=>setconEdit(e.target.value)}/>) : 
                                        (character.constitution)}</h5>
                                        <h5 className="py-2">Intelligence: {editChar ? (<input className="row inputColor" defaultValue={character.intelligence} onChange={(e)=>setintEdit(e.target.value)}/>) : 
                                        (character.intelligence)}</h5>
                                        <h5 className="py-2">Wisdom: {editChar ? (<input className="row inputColor" defaultValue={character.wisdom} onChange={(e)=>setwisEdit(e.target.value)}/>) : 
                                        (character.wisdom)}</h5>
                                        <h5 className="py-2">Charisma: {editChar ? (<input className="row inputColor" defaultValue={character.charisma} onChange={(e)=>setchaEdit(e.target.value)}/>) : 
                                        (character.charisma)}</h5>
                                        <h5 className="py-2">Speed: {editChar ? (<input className="row inputColor" defaultValue={character.speed} onChange={(e)=>setspdEdit(e.target.value)}/>) : 
                                        (character.speed)}</h5>
                                    </div>
                                    {/* SAVE AND DELETE BUTTONS FOR CHARACTER */}
                                    {(character.user_id === props.userState.id) ? (editChar ? 
                                    (<button className="col-2 char-edt-btn m-1" onClick={()=>charSave()}>Save</button>) :
                                    (<button className="col-2 m-1" onClick={()=>setEditChar(true)}>Edit Character</button>)) : ''}
                                    {(character.user_id === props.userState.id) ? (<button className="col-2 char-dlt-btn m-1"
                                    onClick={() => deleteChar()}>Delete Character
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
                                                        {(editProf===prof.id) ? 
                                                        (<input className="row w-100 inputColor" defaultValue={prof.name} onChange={(e)=>setprofNameEdit(e.target.value)}/>) : 
                                                        (prof.name)}</h5> 
                                                    <h6>Description: </h6>
                                                    <p> {(editProf===prof.id) ? 
                                                        (<textarea className="row w-100 inputColor" defaultValue={prof.description} onChange={(e)=>setprofDescEdit(e.target.value)}/>) : 
                                                        (prof.description)}</p>
                                                    <h6>Type: {(editProf===prof.id) ? (<input className="row w-100 inputColor" defaultValue={prof.type} onChange={(e)=>setprofTypeEdit(e.target.value)}/>) : 
                                                        (prof.type)}</h6>
                                                    {(editProf===prof.id) ? (<h6>SubType: <input className="row w-100 inputColor" defaultValue={prof.subtype} onChange={(e)=>setprofSubTEdit(e.target.value)}/></h6>)    
                                                        : (prof.subtype ? (<h6>SubType: {prof.subtype}</h6>) : '')}
                                                    <h6>Ability: {(editProf===prof.id) ? (<input className="row w-100 inputColor" defaultValue={prof.ability} onChange={(e)=>setprofAbilityEdit(e.target.value)}/>) : 
                                                        (prof.ability)}</h6>
                                                    <h6>Script: {(editProf===prof.id) ? (<input className="row w-100 inputColor" defaultValue={prof.script} onChange={(e)=>setprofScriptEdit(e.target.value)}/>) : 
                                                        (prof.script)}</h6>
                                                    <h6>Typical Speakers: {(editProf===prof.id) ? (<input className="row w-100 inputColor" defaultValue={prof.typicalSpeakers} onChange={(e)=>setprofTSEdit(e.target.value)}/>) : (prof.typicalSpeakers)}</h6>
                                                {/* EDIT AND DELETE BUTTONS FOR PROFICIENCIES */}
                                                    {(prof.user_id === props.userState.id) ? ((editProf===prof.id) ? 
                                                        (<button className="prof-edt-btn m-1" onClick={(e)=>profSave(prof.id)}>Save</button>) : (<button className="m-1" onClick={()=>setEditProf(prof.id)}>Edit</button>)) : ''}
                                                    {(prof.user_id === props.userState.id) ? (<button className="prof-dlt-btn"
                                                    onClick={(e) => deleteProf(prof.id)}>Delete </button>) : ""}
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
                                                    <h5>{(editFeat===feat.id) ? (<input className="row w-100 inputColor" defaultValue={feat.name} onChange={(e)=>setfeatNameEdit(e.target.value)}/>) : (feat.name)}</h5>
                                                    
                                                    <h6>Description: </h6>
                                                    <p>{(editFeat===feat.id) ? (<textarea className="row w-100 inputColor" defaultValue={feat.description} onChange={(e)=>setfeatDescEdit(e.target.value)}/>) : (feat.description)}</p>
                                                    <h6>Type: {(editFeat===feat.id) ? (<textarea className="row w-100 inputColor" defaultValue={feat.type} onChange={(e)=>setfeatTypeEdit(e.target.value)}/>) : (feat.type)}</h6>
                                                {/* EDIT AND DELETE BUTTONS FOR FEATURES */}
                                                    {(feat.user_id === props.userState.id) ? ((editFeat===feat.id) ? 
                                                        (<button className="feat-edt-btn m-1" onClick={(e)=>featSave(feat.id)}>Save</button>) : (<button className="m-1" onClick={()=>setEditFeat(feat.id)}>Edit</button>)) : ''}
                                                    {(feat.user_id === props.userState.id) ? (<button className="feat-dlt-btn"
                                                    onClick={(e) => deleteFeat(feat.id)}>Delete
                                                    </button>) : ""}
                                                </div>
                                            )})}
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
                                            <h5>{(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.name} onChange={(e)=>setspellNameEdit(e.target.value)}/>) : (spell.name)}</h5>
                                            <h6>Desc:</h6>
                                            <p>{(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.description} onChange={(e)=>setspellDescEdit(e.target.value)}/>) : (spell.description)}</p>
                                            <h6>Type: {(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.type} onChange={(e)=>setspellTypeEdit(e.target.value)}/>) : (spell.type)}</h6>
                                            <h6>Level: {(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.level} onChange={(e)=>setspellLvlEdit(e.target.value)}/>) : (spell.level)}</h6>
                                            <h6>Attack: {(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.attack} onChange={(e)=>setspellAtkEdit(e.target.value)}/>) : (spell.attack)}</h6>
                                            <h6>Duration: {(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.duration} onChange={(e)=>setspellDurEdit(e.target.value)}/>) : (spell.duration)}</h6>
                                            <h6>Range: {(editSpell===spell.id) ? (<input className="row w-100 inputColor" defaultValue={spell.range} onChange={(e)=>setspellRngeEdit(e.target.value)}/>) : (spell.range)}</h6>
                                        {/* EDIT AND DELETE BUTTONS FOR SPELLS */}
                                            {(spell.user_id === props.userState.id) ? ((editSpell===spell.id) ? 
                                                (<button className="spell-edt-btn m-1" onClick={()=>spellSave(spell.id)}>Save</button>) : (<button className="m-1" onClick={()=>setEditSpell(spell.id)}>Edit</button>)) : ''}
                                            {(spell.user_id === props.userState.id) ? (<button className="spell-dlt-btn"
                                            onClick={() => deleteSpell(spell.id)}>Delete
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
                                            <h5>{(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.name} onChange={(e)=>setequipNameEdit(e.target.value)}/>) : (equip.name)}</h5>
                                            <h6>Desc: </h6>
                                            <p>{(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.description} onChange={(e)=>setequipDescEdit(e.target.value)}/>) : (equip.description)}</p>
                                            <h6>Type: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.type} onChange={(e)=>setequipTypeEdit(e.target.value)}/>) : (equip.type)}</h6>
                                            <h6>Properties: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.properties} onChange={(e)=>setequipPropEdit(e.target.value)}/>) : (equip.properties)}</h6>
                                            <h6>Cost: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.cost} onChange={(e)=>setequipCostEdit(e.target.value)}/>) : (equip.cost)}</h6>
                                            <h6>Weight: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.weight} onChange={(e)=>setequipWtEdit(e.target.value)}/>) : (equip.weight)}</h6>
                                            <h6>Damage: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.damage} onChange={(e)=>setequipDmgEdit(e.target.value)}/>) : (equip.damage)}</h6>
                                            <h6>Armor Class: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.armorClass} onChange={(e)=>setequipArmEdit(e.target.value)}/>) : (equip.armorClass)}</h6>
                                            <h6>Strength: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.strength} onChange={(e)=>setequipStrEdit(e.target.value)}/>) : (equip.strength)}</h6>
                                            <h6>Stealth: {(editEquip===equip.id) ? (<input className="row w-100 inputColor" defaultValue={equip.stealth} onChange={(e)=>setequipStlEdit(e.target.value)}/>) : (equip.stealth)}</h6>
                                        {/* EDIT AND DELETE BUTTONS FOR EQUIPMENT */}
                                            {(equip.user_id === props.userState.id) ? ((editEquip===equip.id) ? 
                                            (<button className="equip-edt-btn m-1" onClick={()=>equipSave(equip.id)}>Save</button>) : (<button className="m-1" onClick={()=>setEditEquip(equip.id)}>Edit</button>)) : ''}
                                            {(equip.user_id === props.userState.id) ? (<button className="equip-dlt-btn"
                                            onClick={() => deleteEquip(equip.id)}>Delete
                                            </button>) : ""}
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                            </TabPanel>
                            </Tabs>
                                <br />
                                <br />
                                <br />
                                <br />
                        </div>
                    </div>
                </div>
            </div>
        
    )
}