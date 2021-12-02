import React, { useState, useEffect, Component } from "react";
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

    const addCatalog = () => {
        navigate(`/addCatalog/${id}`)
    }

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

    return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="my-4">{character.charName}</h1>
                        <button className="col-2 btn my-1 me-1" >Edit Character</button>
                        <button data-tip data-for="catalog" className="col-2 btn my-1 me-1" onClick={addCatalog}>Add to Character</button>
                        <ReactTooltip id="catalog"><p>Add Equipment, Spells, Proficiencies or Features</p></ReactTooltip>
                        {userButton}
                        <button data-tip data-for="campaign" className="col-2 btn my-1 me-1" onClick={campaignPage}>Campaign Page</button>
                        <ReactTooltip id="campaign"><p>Go to Campaign with this Character</p></ReactTooltip>
                    </div>
                    <div className="col">
                        {character.image_content}
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
                            <TabPanel>
                                <div className="row">
                                    <div className="col-8">
                                        <li className="">
                                            <h5>Race: {character.race}</h5>
                                        </li> <br />
                                        <li className="">
                                            <h5>SubRace: {character.subrace}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Class: {character.class}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>SubClass:{character.subclass}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Age: {character.age}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Level: {character.level}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Alignment: {character.alignment}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Background: {character.background}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Personality: </h5>
                                            <p>{character.personality}</p>
                                        </li>
                                    </div>
                                    <div className="col-4">
                                        <li className="">
                                            <h5>HitPoints: {character.hitpoints}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Current HP: {character.currhitpoints}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Temp HP: {character.temphitpoints}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Strength: {character.strength}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Dexterity: {character.dexterity}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Constitution: {character.constitution}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Intelligence: {character.intelligence}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Wisdom: {character.wisdom}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Charisma: {character.charisma}</h5>
                                        </li><br />
                                        <li className="">
                                            <h5>Speed: {character.speed}</h5>
                                        </li>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row">
                                    <div className="col-6">
                                        <h4>Proficiencies</h4>
                                        {proficiency.map((prof)=>{
                                            return(
                                                <div>
                                                    <h5>{prof.name}</h5>
                                                    <h6>{prof.description}</h6>
                                                    <h6>{prof.type}</h6>
                                                    <h6>{prof.subtype}</h6>
                                                    <h6>{prof.ability}</h6>
                                                    <h6>{prof.script}</h6>
                                                    <h6>{prof.typicalSpeakers}</h6>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="col-6">
                                        <h4>Features</h4>
                                        {feature.map((feat)=>{
                                            return(
                                                <div>
                                                    <h5>{feat.name}</h5>
                                                    <h6>{feat.description}</h6>
                                                    <h6>{feat.type}</h6>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div>
                            <h4>Spells</h4>
                                <div className="row">
                                {spell.map((spell)=>{
                                    return(
                                        <div className="col-2">
                                            <h5>{spell.name}</h5>
                                            <h6>{spell.description}</h6>
                                            <h6>{spell.type}</h6>
                                            <h6>{spell.level}</h6>
                                            <h6>{spell.duration}</h6>
                                            <h6>{spell.range}</h6>
                                            <h6>{spell.attack}</h6>
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div>
                            <h4>Equipment</h4>
                                <div className="row">
                                {inventory.map((item)=>{
                                    return(
                                        <div className="col-2">
                                            <h5>{item.name}</h5>
                                            <h6>{item.type}</h6>
                                            <h6>{item.description}</h6>
                                            <h6>{item.properties}</h6>
                                            <h6>{item.cost}</h6>
                                            <h6>{item.weight}</h6>
                                            <h6>{item.armorClass}</h6>
                                            <h6>{item.strength}</h6>
                                            <h6>{item.stealth}</h6>
                                            <h6>{item.damage}</h6>
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