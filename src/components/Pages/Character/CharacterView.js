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
                <button className="col-2 btn my-1 me-1">User Profile</button>
              </Link>
            )
        } else {
            setUserButton (
                <Link
                  to={{ pathname: `/profile/${userId}`}}
                  className="d-inline"
                >
                <button className="col-2 btn my-1 me-1">User Profile</button>
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
                        <h1>{character.charName}</h1>
                        <button className="col-2 btn my-1 me-1" >Edit Character</button>
                        <button className="col-2 btn my-1 me-1" onClick={addCatalog}>Add to Character
                        <ReactTooltip ><p>Add Equipment, Spells, Proficiencies or Features</p></ReactTooltip></button>
                        {userButton}
                        <button className="col-2 btn my-1 me-1" onClick={campaignPage}>Campaign Page</button>
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
                                <li className="">
                                    <h4>Race: {character.race}</h4>
                                </li> <br />
                                <li className="">
                                    <h4>SubRace: {character.subrace}</h4>
                                </li><br />
                                <li className="">
                                    <h4>Class: {character.class}</h4>
                                </li><br />
                                <li className="">
                                    <h4>SubClass:{character.subclass}</h4>
                                </li><br />
                                <li className="">
                                    <h4>Age: {character.age}</h4>
                                </li><br />
                                <li className="">
                                    <h4>Alignment: {character.alignment}</h4>
                                </li><br />
                                <li className="">
                                    <h4>Background: {character.background}</h4>
                                </li><br />
                                <li className="">
                                    <h4>Personality: {character.personality}</h4>
                                </li>
                            </TabPanel>
                            <TabPanel>
                                <div>
                                    {proficiency.map((prof)=>{
                                        return(<h4>{prof.name}</h4>
                                            )
                                        })}
                                    {feature.map((feat)=>{
                                        return(<h4>{feat.name}</h4>
                                            )
                                        })}
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div>
                                {spell.map((spell)=>{
                                    return(<h4>{spell.name}</h4>
                                        )
                                    })}
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div>
                                {inventory.map((item)=>{
                                    return(<h4>{item.name}</h4>
                                        )
                                    })}
                            </div>
                            </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}