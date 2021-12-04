import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Character from "../Character/Character";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Table from "./VirTable/Table"
import API from "../../../utils/API"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const containerStyle = {
    height: '90vh',
    border: '1px solid gray',
    backgroundImage: `url(https://64.media.tumblr.com/2267f9cbe894a43c5d7170200035bfee/tumblr_p3yb76ZWh61x3jozbo1_1280.jpg)`,
    backgroundSize: '100% 100%'

};
function Gameplay(props) {
    console.log("my user_id", props.userState.id);
    const { socket } = props;
    const { id } = useParams();

    const [tab, setTab] = useState('characters');
    const [tabContents, setTabContents] = useState('');
    const [characters, setCharacters] = useState([]);
    const [CampaignName, setCampaignName] = useState('');
    const [newToken, setNewToken] = useState(0);
    const [show, setShow] = useState(false);
    const [npcName,setNpcName] = useState('');
    const [tokensList, setTokensList] = useState([]);
    const [deletedToken, setDeletedToken] = useState(0);

    // function that creates the token being passed into each li of character name as an onclick 
    function createToken(character) {
        API.findTokens(id).then((res) => {
            let data = res.data
            console.log(character.charName)
            console.log(data.length)
            const createdToken = {
                name: character.charName,
                token_id: data.length,
                x: 0,
                y: 0
            }
            API.createToken(id, createdToken).then((res) => {
                setNewToken(2)
                console.log(res);
                console.log("I created a token!");
            })
            setNewToken(0)
        })
    }
    // function that creates npc tokens
    
    function createNpcToken() {
        API.findTokens(id).then((res) => {
            let data = res.data
            console.log(data.length)
            const createdToken = {
                name: npcName,
                token_id: data.length,
                x: 0,
                y: 0
            }
            API.createToken(id, createdToken).then((res) => {
                setNewToken(1)
                console.log(res);
                console.log("I created a token!");
            })
            setNewToken(0)
        })
    }

    // deletes token by token_id
    function deleteNpcToken(token_id) {
        console.log(token_id)
            API.deleteToken(id,token_id).then((res) => {
                setDeletedToken(1)
                console.log(res);
                console.log("I deleted a token!");
            })  
            setDeletedToken(0)
    }
    
    // handles token form input change and updates state
   
    const handleTokenInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'npcName') {
            setNpcName(inputValue);
        } 
    };

    // handles modal state on close
    const handleClose = () => setShow(false);

    useEffect(() => {
        socket.emit("join campaign room", id);
    }, []);

    // populates the characters state
    useEffect(() => {
        API.findCampaign(id, props.token).then((res) => {
            setCampaignName(res.data.name);
            const myChars = res.data.Characters.filter((character) => character.user_id == props.userState.id)
            console.log("myChar", myChars);
            setCharacters(myChars);
        })
    }, [props]);

    // populates the tokens list state
    useEffect(() => {
        API.findCampaign(id, props.token).then((res) => {
            const tokensList = res.data.Tokens
            console.log("tokensList", tokensList);
            setTokensList(tokensList);
        })
    }, [newToken,deletedToken]);

    useEffect(() => {
        switch (tab) {
            case "compendium":
                setTabContents(
                    <div>
                        <h1>compendium!</h1>
                    </div>
                )
                break;

            case "settings":
                setTabContents(
                    <div>
                        <h1>settings!</h1>
                    </div>
                )
                break;

            default:
                setTabContents(
                    <div>
                        <h1>characters!</h1>
                        <ul>
                            {characters.map((character) => {
                                return (<li onClick={() => createToken(character)}>{character.charName}</li>)
                            })}
                        </ul>
                    </div>
                )
                break;
        }
    }, [tab, characters]);
    // let monsterList = []
    return (
        <div className="container-fluid p-0 m-0 border border-3 border-danger">
            <div className="row p-0 m-0">
                <div className="col-3 border border-primary border-4 char-menu"><h1></h1></div>
                <div className="col-7 border border-info border-4 gameboard" style={containerStyle}>
                    <DndProvider backend={HTML5Backend}>
                        <Table camp_id={id} newToken={newToken} deletedToken={deletedToken}/>
                    </DndProvider>
                    <div className="row align-items-center justify-content-center">
                        <ul class="list-group col-4 m-3">
                            {tokensList.map((token) => {
                                return (<li class="list-group-item" onClick={() => deleteNpcToken(token.token_id)}>Click to delete---{token.name}</li>)
                            })}
                        </ul>
                            <button onClick={() => setShow(true)}className="m-3 col-5 h-25 w-25">CREATE NEW NPC TOKEN</button>
                    </div>
                </div>
                <div className="col-2 border border-success border-4 mini-menu">
                    <div>
                        <button onClick={() => setTab('characters')}>Char</button>
                        <button onClick={() => setTab('compendium')}>Comp</button>
                        <button onClick={() => setTab('settings')}>Sett</button>
                    </div>
                    <div className="tab-contents">
                        {tabContents}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create a Token!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="my-5 py-5 text-center" id="signup-form">
                <h4>Token Name</h4>
                <input className="m-6" id="username-signup"
                    value={npcName}
                    name="npcName"
                    onChange={handleTokenInputChange}
                    type="text"
                    placeholder="Demagorgon"
                />
                


            </form>
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="secondary" onClick={() => createNpcToken()}>
                        Create
                    </Button> 
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer> 
            </Modal> 
        </div>
    );
}
export default Gameplay;