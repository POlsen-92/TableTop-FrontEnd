import React, { useState, useEffect, Component } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "bootstrap/dist/css/bootstrap.css";
import "./CharacterView.css";
import API from "../../../utils/API";

export default function CharacterView(props) {

    const navigate = useNavigate();
    const { id } = useParams();
    
    const addCatalog = () => {
        navigate('/addCatalog')
    }

    const [inventory,setInventory] = useState([]);
    const [spell,setSpell] = useState([]);
    const [feature,setFeature] = useState([]);
    const [proficiency,setProficiency] = useState([]);
    const [character,setCharacter] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() =>{
        API.findCharacter(id).then((res)=>{
            console.log(res);
            setInventory(res.data.Inventorys);
            setSpell(res.data.Spells);
            setFeature(res.data.Features);
            setProficiency(res.data.Proficiencys);
            setCharacter(res.data)
        })
    },[id])
    return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>{character.charName}</h1>
                        <button className="col-2 btn my-1 me-1" >Edit Character</button>
                        <button className="col-2 btn my-1 me-1" onClick={addCatalog}>Add Catalog</button>
                    </div>
                    <div className="col">
                        {character.image_content}
                    </div>
                    <div className="row">
                        <div className="col">
                        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                            <TabList>
                                <Tab>Character Information</Tab>
                                <Tab>Title 2</Tab>
                            </TabList>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                            </Tabs>
                            <h3>Information</h3>
                                    <ul>
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
                                    </ul>
                        </div>
                        <div className="col">
                            <h3>Spells</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Proficiencies</h3>
                        </div>
                        <div className="col">
                            <h3>Features</h3>
                        </div>
                        <div className="col">
                            <h3>Inventory</h3>
                        </div>
                    </div>
                </div>
            </div>
    )
}