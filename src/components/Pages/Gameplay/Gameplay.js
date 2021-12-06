import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Character from "../Character/Character";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Table from "./VirTable/Table"
import API from "../../../utils/API"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dice from "../Dice/Dice";
import direWolf from "./VirTable/images/direwolf.png";
import bukavac from "./VirTable/images/bukavac.png";
import crab from "./VirTable/images/Beasts/Crab.png";
import Dogmole from "./VirTable/images/Beasts/Dogmole.png";
import Spider from "./VirTable/images/Beasts/Spider.png";
import WhiteMonkey from "./VirTable/images/Beasts/Babboon ape monkey.png";
import Umberhulk from "./VirTable/images/Monstrositys/Umberhulk.png";
import ArmorAnt from "./VirTable/images/Monstrositys/Armor Ant.png";
import Yeti from "./VirTable/images/Monstrositys/Yeti.png";
import YetiKing from "./VirTable/images/Monstrositys/Yeti King.png";
import DarzHelgar from "./VirTable/images/zz token/darz helgar.png";
import DukeZalto from "./VirTable/images/zz token/duke zalto.png";
import Zephyros from "./VirTable/images/zz token/zephyros.png";
import ZiLiang from "./VirTable/images/zz token/zi liang.png";
import Yusdrayl from "./VirTable/images/zz token/Yusdrayl.png";
import YuanTi from "./VirTable/images/zz token/Yuan-ti Abomination.png";
import XolkinAlassandar from "./VirTable/images/zz token/xolkin alassandar.png";
import ZhaoLiKhan from "./VirTable/images/zz token/Weretiger.png";
import BriskaneWalrog from "./VirTable/images/zz token/Wereboar.png";
import vaasha from "./VirTable/images/zz token/vaasha.png";
import vaal from "./VirTable/images/zz token/vaal.png";
import UrgalaMeltimer from "./VirTable/images/zz token/urgala meltimer.png";
import ThriKreen from "./VirTable/images/zz token/Thri-kreen.png";
import TholtzDaggerdark from "./VirTable/images/zz token/tholtz daggerdark.png";
import TarulVar from "./VirTable/images/zz token/Tarul Var.png";
import Solar from "./VirTable/images/zz token/Solar.png";
import SirBraford from "./VirTable/images/zz token/Sir Braford.png";
import SirBaricNylef from "./VirTable/images/zz token/sir baric nylef.png";
import SharwynHucrele from "./VirTable/images/zz token/Sharwyn Hucrele.png";
import ShalvusMartholio from "./VirTable/images/zz token/shalvus martholio.png";
import ShalendraFloshin from "./VirTable/images/zz token/Shalendra Floshin.png";
import SahuaginBaron from "./VirTable/images/zz token/Sahuagin Baron.png";
import Rhakshasa from "./VirTable/images/zz token/Rhakshasa.png";
import Othovir from "./VirTable/images/zz token/othovir.png";
import Orog from "./VirTable/images/zz token/Orog.png";
import Orlekto from "./VirTable/images/zz token/orlekto.png";
import Obmi from "./VirTable/images/zz token/Obmi.png";
import NarthTezrin from "./VirTable/images/zz token/narth tezrin.png";
import MarkhamSouthwell from "./VirTable/images/zz token/markham southwell.png";
import JarlGrugnur from "./VirTable/images/zz token/Jarl Grugnur.png";
import GorvanIronheart from "./VirTable/images/zz token/Gorvan Ironheart.png";
import DarathraShendrel from "./VirTable/images/zz token/darathra shendrel.png";







const containerStyle = {
    height: '94vh',
    border: '1px solid gray',
    backgroundImage: `url(https://64.media.tumblr.com/2267f9cbe894a43c5d7170200035bfee/tumblr_p3yb76ZWh61x3jozbo1_1280.jpg)`,
    backgroundSize: '100% 100%'

};
const tokenCategories = ["Beasts","Monstrositys"]
const Monstrositys=[
    {
        name:"Armor Ant",
        value: ArmorAnt
    },
    {
        name:"Umberhulk",
        value: Umberhulk
    },
    {
        name:"Yeti",
        value: Yeti
    },
    {
        name:"Yeti King",
        value: YetiKing
    },

]
const Beasts =[
    {
        name:"Bukavac",
        value: bukavac
    },
    {
        name:"Crab",
        value: crab
    },
    {
        name:"Dire Wolf",
        value: direWolf
    },
    {
        name:"Dogmole",
        value: Dogmole
    },
    {
        name:"Spider",
        value: Spider
    },
    {
        name:"White Monkey",
        value: WhiteMonkey
    }

]
const charTokens=[
    {
        name: "Briskane Walrog",
        value: BriskaneWalrog,
        race: "Boar-Folk",
        gender: "Male"
    },
    {
        name: "Darz Helgar",
        value: DarzHelgar,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Darathra Shendrel",
        value: DarathraShendrel,
        race: "Human",
        gender: "Female"
    },
    {
        name: "Duke Zalto",
        value: DukeZalto,
        race: "Fire Giant",
        gender: "Male"
    },
    {
        name: "Gorvan Ironheart",
        value: GorvanIronheart,
        race: "Dwarf",
        gender: "Male"
    },
    {
        name: "Jarl Grugnur",
        value: JarlGrugnur,
        race: "Giant",
        gender: "Male"
    },
    {
        name: "Markham Southwell",
        value: MarkhamSouthwell,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Narth Tezrin",
        value: NarthTezrin,
        race: "Boar-Folk",
        gender: "Male"
    },
    {
        name: "Obmi",
        value: Obmi,
        race: "Dwarf",
        gender: "Male"
    },
    {
        name: "Orlekto",
        value: Orlekto,
        race: "Storm Giant",
        gender: "Male"
    },
    {
        name: "Orog",
        value: Orog,
        race: "Orc",
        gender: "Male"
    },
    {
        name: "Othovir",
        value: Othovir,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Rhakshasa",
        value: Rhakshasa,
        race: "Tiger Folk",
        gender: "Male"
    },
    {
        name: "Sahuagin Baron",
        value: SahuaginBaron,
        race: "Merfolk",
        gender: "Male"
    },
    {
        name: "Shalendra Floshin",
        value: ShalendraFloshin,
        race: "Elf",
        gender: "Female"
    },
    {
        name: "Shalvus Martholio",
        value: ShalvusMartholio,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Sharwyn Hucrele",
        value: SharwynHucrele,
        race: "Human",
        gender: "Female"
    },
    {
        name: "Sir Baric Nylef",
        value: SirBaricNylef,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Sir Braford",
        value: SirBraford,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Tarul Var",
        value: TarulVar,
        race: "Lich",
        gender: "Male"
    },
    {
        name: "Tholtz Daggerdark",
        value: TholtzDaggerdark,
        race: "Human",
        gender: "Male"
    },
    {
        name: "Urgala Meltimer",
        value: UrgalaMeltimer,
        race: "Human",
        gender: "Female"
    },
    {
        name: "Vaal",
        value: vaal,
        race: "Cloud giant",
        gender: "Male"
    },
    {
        name: "Vaasha",
        value: vaasha,
        race: "Storm giant",
        gender: "Female"
    },
    {
        name: "Xolkin Alassandar",
        value: XolkinAlassandar,
        race: "Elf",
        gender: "Male"
    },
    {
        name: "Yuan-Ti",
        value: YuanTi,
        race: "Lizard Folk",
        gender: "Male"
    },
    {
        name: "Yusdrayl",
        value: Yusdrayl,
        race: "Dragon Born",
        gender: "Male"
    },
    {
        name: "Zephyros",
        value: Zephyros,
        race: "Cloud giant",
        gender: "Male"
    },
    {
        name: "Zi Liang",
        value: ZiLiang,
        race: "Human",
        gender: "Female"
    },
    {
        name: "Zhao-Li Khan",
        value: ZhaoLiKhan,
        race: "Tiger-Folk",
        gender: "Male"
    },
    

]
console.log(direWolf,"-------------------------wolf");
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
    const [show1, setShow1] = useState(false);
    const [npcName,setNpcName] = useState('');
    const [tokensList, setTokensList] = useState([]);
    const [deletedToken, setDeletedToken] = useState(0);
    const [userSquares,setUserSquares] = useState(20)
    const [currentImage,setCurrentImage] = useState('')
    const [currentCategory, setCurrentCategory] = useState('Beasts')
    const [charTokenSelect, setCharTokenSelect] = useState('')
    const [charTokenName, setCharTokenName] = useState('')
    
    // function that creates the token being passed into each li of character name as an onclick 
    function createToken() {
        API.findTokens(id).then((res) => {
            let data = res.data
            console.log(data.length)
            const createdToken = {
                name: charTokenName,
                token_id: data.length,
                x: 0,
                y: 0,
                image: charTokenSelect
            }
            API.createToken(id, createdToken).then((res) => {
                setNewToken(2)
                console.log(res);
                console.log("I created a token!");
            })
            setNewToken(0)
            document.getElementById("charTokenSelect").selectedIndex = 0;
        })
    }
    // function that creates npc tokens
    
    function createNpcToken() {
        // setCurrentImage(direWolf)
        API.findTokens(id).then((res) => {
            let data = res.data
            console.log(data.length)
            const createdToken = {
                name: npcName,
                token_id: data.length,
                x: 0,
                y: 0,
                image: currentImage,
            }
            API.createToken(id, createdToken).then((res) => {
                setNewToken(1)
                console.log(res);
                console.log("I created a token!");
            })
            setNewToken(0)
            document.getElementById("imageSelect").selectedIndex = 0;
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
        if(inputType === 'imageSelect'){
            setCurrentImage(inputValue);
        }
        if(inputType === 'categorySelect'){
            setCurrentCategory(inputValue);
        }
        if(inputType === 'charTokenSelect'){
            setCharTokenSelect(inputValue);
        }
        if(inputType === 'charTokenName'){
            setCharTokenName(inputValue);
        }
    };

    // handles modal state on close
    const handleClose = () => {
        setShow(false);
        setNpcName('');
    }
    const handleClose1 = () => {
        setShow1(false);
    }

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
                        <h1 className="border text-center">Compendium</h1>
                    </div>
                )
                break;

            case "settings":
                setTabContents(
                    <div>
                        <h1 className="border text-center">Settings</h1>
                    </div>
                )
                break;

            default:
                setTabContents(
                    <div className="text-center ">
                        <h1 className="border text-center shadow-lg">Characters</h1>
                        <ul class="list-group " >
                            {characters.map((character) => {
                                return (
                                    < >
                                <li className="text-center border list-group-item" >{character.charName}</li>
                                <button onClick={() => setShow1(true)} className="align-item-center mx-5">Place Token</button>
                                    </>
                                )
                            })}
                        </ul>
                        <button onClick={() => setShow(true)}className="m-3 ">Create Custom Token</button>
                        <img/>
                    </div>
                )
                break;
        }
    }, [tab, characters]);
    // let monsterList = []
    return (
        <div className="container-fluid p-0 m-0 ">
            <div className="row p-0 m-0">
                <div className="col-3 border border-primary border-4 char-menu">
                    <h2 className="border text-center">Dice</h2>
                    <Dice/>
                    <div className="row align-items-center justify-content-center">
                        <h2 className="text-center border col-11">Token List</h2>
                        <ul className="list-group col-2 m-3 align-items-center justify-content-center">
                            {tokensList.map((token) => {
                                return (
                                    <div >
                                <li className="list-group-item ">{token.name}</li>
                                <button className="" onClick={() => deleteNpcToken(token.token_id)}>Delete Token</button>
                                </div>
                                )
                            })}
                        </ul>

                    </div>
                    </div>
                <div className="col-7 gameboard" style={containerStyle}>
                    <DndProvider backend={HTML5Backend}>
                        <Table camp_id={id} newToken={newToken} deletedToken={deletedToken}/>
                    </DndProvider>
                    
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
                    <select id="categorySelect" name="categorySelect" onChange={handleTokenInputChange}>
                        {tokenCategories.map((category)=>{
                            return (
                                    <option value={category}>{category}</option>
                            )
                        })}
                    </select>
                    <select id="imageSelect" name="imageSelect" onChange={handleTokenInputChange}>
                    <option >Choose Wisely...</option>
                    {currentCategory === "Beasts" ? (
                            <>
                            {Beasts.map((beast) => {
                                        return (
                                            <option value={beast.value}>{beast.name}</option>
                                        )
                                    })}
                            </>
                            
                        ) : null}   
                        {currentCategory === "Monstrositys" ? (
                            <>
                            {Monstrositys.map((monstrosity) => {
                                        return (
                                            <option value={monstrosity.value}>{monstrosity.name}</option>
                                        )
                                    })}
                            </>
                            
                        ) : null}   
                        
                    </select>


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

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>Select an image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="my-5 py-5 text-center" >
                    <h4>Token Image</h4>
                    <select id="charTokenSelect" name="charTokenSelect" onChange={handleTokenInputChange}>
                            <option >Choose Wisely...</option>
                        {charTokens.map((charToken)=>{
                            return (
                                    <option value={charToken.value}>{charToken.name}  |  {charToken.race}  |  {charToken.gender}</option>
                            )
                        })}
                    </select>
            <h4>Token Name</h4>
                <input className="m-6" id="charname"
                    value={charTokenName}
                    name="charTokenName"
                    onChange={handleTokenInputChange}
                    type="text"
                    placeholder="Gladius the Mighty"
                    />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="secondary" onClick={() => createToken()}>
                        Create
                    </Button> 
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer> 
            </Modal> 
        </div>
    );
}
export default Gameplay;