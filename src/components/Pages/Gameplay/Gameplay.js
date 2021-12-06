import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Character from "../Character/Character";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Table from "./VirTable/Table";
import API from "../../../utils/API";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import Dice from "../Dice/Dice.js";
import direWolf from "./VirTable/images/direwolf.png";
import bukavac from "./VirTable/images/bukavac.png";
import crab from "./VirTable/images/Beasts/Crab-min.png";
import Dogmole from "./VirTable/images/Beasts/Dogmole-min.png";
import Spider from "./VirTable/images/Beasts/Spider-min.png";
import WhiteMonkey from "./VirTable/images/Beasts/Babboon ape monkey-min.png";
import Umberhulk from "./VirTable/images/Monstrositys/Umberhulk-min.png";
import ArmorAnt from "./VirTable/images/Monstrositys/Armor Ant-min.png";
import Yeti from "./VirTable/images/Monstrositys/Yeti-min.png";
import YetiKing from "./VirTable/images/Monstrositys/Yeti King-min.png";
import DarzHelgar from "./VirTable/images/zz token/darz helgar-min.png";
import DukeZalto from "./VirTable/images/zz token/duke zalto-min.png";
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
import DarathraShendrel from "./VirTable/images/zz token/darathra shendrel-min.png";
import WinterWolf from "./VirTable/images/Beasts/Winter wolf-min.png";
import GiantWasp from "./VirTable/images/Beasts/Wasps-min.png";
import Worg from "./VirTable/images/Monstrositys/Worg-min.png";
import TarrasqueDaddy from "./VirTable/images/Monstrositys/Tarrasque Daddy-min.png";
import SandSquidKraken from "./VirTable/images/Monstrositys/Sand Squid Kracken-min.png";
import Remorhaz from "./VirTable/images/Monstrositys/Remorhaz-min.png";
import Minotaur from "./VirTable/images/Monstrositys/Minotaur-min.png";
import MinotaurRager from "./VirTable/images/Monstrositys/Minotaur Rager-min.png";
import MinotaurMorningstar from "./VirTable/images/Monstrositys/Minotaur Morningstar-min.png";
import Mimic from "./VirTable/images/Monstrositys/Mimic-min.png";
import Hippogriff from "./VirTable/images/Monstrositys/Hippogriff-min.png";
import Harpy from "./VirTable/images/Monstrositys/harpy-min.png";
import FlyingGolem from "./VirTable/images/Monstrositys/flying golem-min.png";
import Chuul from "./VirTable/images/Monstrositys/Chuul-min.png";
import Chul from "./VirTable/images/Monstrositys/Chul-min.png";
import Bulette from "./VirTable/images/Monstrositys/bulette-min.png";
import BlackMinotaur from "./VirTable/images/Monstrositys/Black Minotuar-min.png";
import Tiger from "./VirTable/images/Beasts/tiger-min.png";
import Skunk from "./VirTable/images/Beasts/skunk-min.png";
import Shark from "./VirTable/images/Beasts/Shark-min.png";
import PlagueRat from "./VirTable/images/Beasts/Plague Rat-min.png";
import OwlBear from "./VirTable/images/Beasts/owlbear-min.png";
import Mammoth from "./VirTable/images/Beasts/Mammoth-min.png";
import Killerwhale from "./VirTable/images/Beasts/Killerwhale-min.png";
import GiantIceToad from "./VirTable/images/Beasts/GiantIceToad-min.png";
import GiantSnappingTurtle from "./VirTable/images/Beasts/Giant Snapping Turtle-min.png";
import GiantShark from "./VirTable/images/Beasts/Giant Shark-min.png";
import GiantElk from "./VirTable/images/Beasts/Giant Elk-min.png";
import GiantApe from "./VirTable/images/Beasts/Giant Ape-min.png";
import Eagle from "./VirTable/images/Beasts/Eagle-min.png";
import DogmoleJuggernaut from "./VirTable/images/Beasts/Dogmole juggernaut-min.png";
import Dino from "./VirTable/images/Beasts/Dino-min.png";
import DinoTrex from "./VirTable/images/Beasts/Dino t rex-min.png";
import Chicken from "./VirTable/images/Beasts/Chicken-min.png";
import BrownBear from "./VirTable/images/Beasts/brown bear-min.png";
import BlackDog from "./VirTable/images/Beasts/Black dog-min.png";
import DwarfLeftSide from "./VirTable/images/zz token/dwarfleftside-min.png";
import BgRightSide from "./VirTable/images/zz token/bgrightside-min.png";

const containerStyle = {
  height: "94vh",
  border: "1px solid gray",
  backgroundImage: `url(https://64.media.tumblr.com/2267f9cbe894a43c5d7170200035bfee/tumblr_p3yb76ZWh61x3jozbo1_1280.jpg)`,
  backgroundSize: "100% 100%",
};
const tokenCategories = ["Beasts", "Monstrositys"];
const Monstrositys = [
  {
    name: "Armor Ant",
    value: ArmorAnt,
  },
  {
    name: "Black Minotaur",
    value: BlackMinotaur,
  },
  {
    name: "Bulette",
    value: Bulette,
  },
  {
    name: "Chul",
    value: Chul,
  },
  {
    name: "Chuul",
    value: Chuul,
  },
  {
    name: "Flying Golem",
    value: FlyingGolem,
  },
  {
    name: "Harpy",
    value: Harpy,
  },
  {
    name: "Hippogriff",
    value: Hippogriff,
  },
  {
    name: "Mimic",
    value: Mimic,
  },
  {
    name: "Minotaur Morningstar",
    value: MinotaurMorningstar,
  },
  {
    name: "Minotaur Rager",
    value: MinotaurRager,
  },
  {
    name: "Minotaur",
    value: Minotaur,
  },
  {
    name: "Remorhaz",
    value: Remorhaz,
  },
  {
    name: "Sand Squid Kraken",
    value: SandSquidKraken,
  },
  {
    name: "TarrasqueDaddy",
    value: TarrasqueDaddy,
  },
  {
    name: "Umberhulk",
    value: Umberhulk,
  },
  {
    name: "Worg",
    value: Worg,
  },
  {
    name: "Yeti",
    value: Yeti,
  },
  {
    name: "Yeti King",
    value: YetiKing,
  },
];
const Beasts = [
  {
    name: "Black Dog",
    value: BlackDog,
  },
  {
    name: "Bukavac",
    value: bukavac,
  },
  {
    name: "brown bear",
    value: BrownBear,
  },
  {
    name: "Giant Chicken",
    value: Chicken,
  },
  {
    name: "Crab",
    value: crab,
  },
  {
    name: "Dino T-rex",
    value: DinoTrex,
  },
  {
    name: "Dino",
    value: Dino,
  },
  {
    name: "Dire Wolf",
    value: direWolf,
  },
  {
    name: "Dogmole Juggernaut",
    value: DogmoleJuggernaut,
  },
  {
    name: "Dogmole",
    value: Dogmole,
  },
  {
    name: "Eagle",
    value: Eagle,
  },
  {
    name: "Giant Ape",
    value: GiantApe,
  },
  {
    name: "Giant Elk",
    value: GiantElk,
  },
  {
    name: "Giant Wasp",
    value: GiantWasp,
  },
  {
    name: "Giant Shark",
    value: GiantShark,
  },
  {
    name: "Giant Snapping Turtle",
    value: GiantSnappingTurtle,
  },
  {
    name: "Giant Ice Toad",
    value: GiantIceToad,
  },
  {
    name: "Killer Whale",
    value: Killerwhale,
  },
  {
    name: "Mammoth",
    value: Mammoth,
  },
  {
    name: "Owl Bear",
    value: OwlBear,
  },
  {
    name: "PlagueRat",
    value: PlagueRat,
  },
  {
    name: "Shark",
    value: Shark,
  },
  {
    name: "Skunk",
    value: Skunk,
  },
  {
    name: "Spider",
    value: Spider,
  },
  {
    name: "Tiger",
    value: Tiger,
  },
  {
    name: "White Monkey",
    value: WhiteMonkey,
  },
  {
    name: "Winter Wolf",
    value: WinterWolf,
  },
];
const charTokens = [
  {
    name: "Briskane Walrog",
    value: BriskaneWalrog,
    race: "Boar-Folk",
    gender: "Male",
  },
  {
    name: "Darz Helgar",
    value: DarzHelgar,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Darathra Shendrel",
    value: DarathraShendrel,
    race: "Human",
    gender: "Female",
  },
  {
    name: "Duke Zalto",
    value: DukeZalto,
    race: "Fire Giant",
    gender: "Male",
  },
  {
    name: "Gorvan Ironheart",
    value: GorvanIronheart,
    race: "Dwarf",
    gender: "Male",
  },
  {
    name: "Jarl Grugnur",
    value: JarlGrugnur,
    race: "Giant",
    gender: "Male",
  },
  {
    name: "Markham Southwell",
    value: MarkhamSouthwell,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Narth Tezrin",
    value: NarthTezrin,
    race: "Boar-Folk",
    gender: "Male",
  },
  {
    name: "Obmi",
    value: Obmi,
    race: "Dwarf",
    gender: "Male",
  },
  {
    name: "Orlekto",
    value: Orlekto,
    race: "Storm Giant",
    gender: "Male",
  },
  {
    name: "Orog",
    value: Orog,
    race: "Orc",
    gender: "Male",
  },
  {
    name: "Othovir",
    value: Othovir,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Rhakshasa",
    value: Rhakshasa,
    race: "Tiger Folk",
    gender: "Male",
  },
  {
    name: "Sahuagin Baron",
    value: SahuaginBaron,
    race: "Merfolk",
    gender: "Male",
  },
  {
    name: "Shalendra Floshin",
    value: ShalendraFloshin,
    race: "Elf",
    gender: "Female",
  },
  {
    name: "Shalvus Martholio",
    value: ShalvusMartholio,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Sharwyn Hucrele",
    value: SharwynHucrele,
    race: "Human",
    gender: "Female",
  },
  {
    name: "Sir Baric Nylef",
    value: SirBaricNylef,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Sir Braford",
    value: SirBraford,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Tarul Var",
    value: TarulVar,
    race: "Lich",
    gender: "Male",
  },
  {
    name: "Tholtz Daggerdark",
    value: TholtzDaggerdark,
    race: "Human",
    gender: "Male",
  },
  {
    name: "Urgala Meltimer",
    value: UrgalaMeltimer,
    race: "Human",
    gender: "Female",
  },
  {
    name: "Vaal",
    value: vaal,
    race: "Cloud giant",
    gender: "Male",
  },
  {
    name: "Vaasha",
    value: vaasha,
    race: "Storm giant",
    gender: "Female",
  },
  {
    name: "Xolkin Alassandar",
    value: XolkinAlassandar,
    race: "Elf",
    gender: "Male",
  },
  {
    name: "Yuan-Ti",
    value: YuanTi,
    race: "Lizard Folk",
    gender: "Male",
  },
  {
    name: "Yusdrayl",
    value: Yusdrayl,
    race: "Dragon Born",
    gender: "Male",
  },
  {
    name: "Zephyros",
    value: Zephyros,
    race: "Cloud giant",
    gender: "Male",
  },
  {
    name: "Zi Liang",
    value: ZiLiang,
    race: "Human",
    gender: "Female",
  },
  {
    name: "Zhao-Li Khan",
    value: ZhaoLiKhan,
    race: "Tiger-Folk",
    gender: "Male",
  },
];
console.log(direWolf, "-------------------------wolf");
function Gameplay(props) {
  console.log("my user_id", props.userState.id);
  const { id } = useParams();

  const [characters, setCharacters] = useState([]);
  const [CampaignName, setCampaignName] = useState("");
  const [newToken, setNewToken] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [npcName, setNpcName] = useState("");
  const [tokensList, setTokensList] = useState([]);
  const [deletedToken, setDeletedToken] = useState(0);
  const [userSquares, setUserSquares] = useState(20);
  const [currentImage, setCurrentImage] = useState("");
  const [currentCategory, setCurrentCategory] = useState("Beasts");
  const [charTokenSelect, setCharTokenSelect] = useState("");
  const [charTokenName, setCharTokenName] = useState("");

  // function that creates the token being passed into each li of character name as an onclick
  function createToken() {
    API.findTokens(id).then((res) => {
      let data = res.data;
      console.log(data.length);
      const createdToken = {
        name: charTokenName,
        token_id: data.length,
        x: 0,
        y: 0,
        image: charTokenSelect,
      };
      API.createToken(id, createdToken).then((res) => {
        setNewToken(2);
        console.log(res);
        console.log("I created a token!");
      });
      setNewToken(0);
      document.getElementById("charTokenSelect").selectedIndex = 0;
    });
  }
  // function that creates npc tokens

  function createNpcToken() {
    // setCurrentImage(direWolf)
    API.findTokens(id).then((res) => {
      let data = res.data;
      console.log(data.length);
      const createdToken = {
        name: npcName,
        token_id: data.length,
        x: 0,
        y: 0,
        image: currentImage,
      };
      API.createToken(id, createdToken).then((res) => {
        setNewToken(1);
        console.log(res);
        console.log("I created a token!");
      });
      setNewToken(0);
      document.getElementById("imageSelect").selectedIndex = 0;
    });
  }

  // deletes token by token_id
  function deleteNpcToken(token_id) {
    console.log(token_id);
    API.deleteToken(id, token_id).then((res) => {
      setDeletedToken(1);
      console.log(res);
      console.log("I deleted a token!");
    });
    setDeletedToken(0);
  }

  // handles token form input change and updates state

  const handleTokenInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "npcName") {
      setNpcName(inputValue);
    }
    if (inputType === "imageSelect") {
      setCurrentImage(inputValue);
    }
    if (inputType === "categorySelect") {
      setCurrentCategory(inputValue);
    }
    if (inputType === "charTokenSelect") {
      setCharTokenSelect(inputValue);
    }
    if (inputType === "charTokenName") {
      setCharTokenName(inputValue);
    }
  };

  // handles modal state on close
  const handleClose = () => {
    setShow(false);
    setNpcName("");
  };
  const handleClose1 = () => {
    setShow1(false);
  };

  // populates the characters state
  useEffect(() => {
    API.findCampaign(id, props.token).then((res) => {
      setCampaignName(res.data.name);
      setCharacters(res.data.Characters);
    });
  }, [props]);

  // populates the tokens list state
  useEffect(() => {
    API.findCampaign(id, props.token).then((res) => {
      const tokensList = res.data.Tokens;
      console.log("tokensList", tokensList);
      setTokensList(tokensList);
      console.log("tokenslist", tokensList);
    });
  }, [newToken, deletedToken]);

  // let monsterList = []
  return (
    <div className="container-fluid p-0 m-0 " style={{
      background: 'black'
      }}>
      <div className="row p-0 m-0">
        <div className="col-3 char-menu scrollMe-Big" style={{
            backgroundImage: `url(${DwarfLeftSide})`,
            backgroundSize: "100% 100%",
          }}>
          <h2 className="border text-center col-11 bg-dark my-1 mx-1">Dice</h2>
          <Dice />
          <div className="row align-items-center justify-content-center  w-100">
            <h2 className="text-center border col-11 bg-dark">Token List</h2>
            <ul className="list-group m-3 align-items-center display-inline">
              {tokensList.map((token) => {
                return (
                  <div className="d-inline">
                    <li className="list-group-item text-center ">
                    {token.name}
                    <img className="" style={{ height:"4em"}}src={token.image}/>                      
                    </li>
                    <button
                      className=""
                      onClick={() => deleteNpcToken(token.token_id)}
                    >
                      Delete Token
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-6 gameboard" style={containerStyle}>
          <DndProvider backend={HTML5Backend}>
            <Table
              camp_id={id}
              newToken={newToken}
              deletedToken={deletedToken}
            />
          </DndProvider>
        </div>
        <div
          className="col-3 mini-menu"
          style={{
            backgroundImage: `url(${BgRightSide})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="text-center scrollMe-Big">
            <h1 className="border text-center shadow-lg bg-dark m-1">Tokens</h1>
            <ul class="list-group ">
              {characters.map((character) => {
                return (
                  <>
                    <li className="text-center border list-group-item">
                      {character.charName} - {character.subRace ? character.subRace : character.race} - {character.class} {character.subClass}
                      <br />
                      Str: {character.strength}, Dex: {character.dexterity}, Con: 
                      {character.constitution}, Int: {character.intelligence}, Wis: 
                      {character.wisdom}, Cha: {character.charisma}, HP: {character.hitpoints}
                    </li>
                    <li className="text-center border list-group-item">
                      <InputGroup >
                        <InputGroup.Text>Current HP:</InputGroup.Text>
                        <FormControl
                          className="w-25"
                          type="number"
                          value={character.currhitpoints}
                        ></FormControl>
                        </InputGroup>
                        <InputGroup>
                        <InputGroup.Text>Temp HP:</InputGroup.Text>
                        <FormControl
                          className="w-25"
                          type="number"
                          value={character.temphitpoints}
                        ></FormControl>
                      </InputGroup>
                    </li>
                    <button
                      onClick={() => setShow1(true)}
                      className="align-item-center mx-5"
                    >
                      Place Token
                    </button>
                  </>
                );
              })}
            </ul>
            <button onClick={() => setShow(true)} className="m-3 ">
              Create Custom Token
            </button>
            <img />
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
            <input
              className="m-6"
              id="username-signup"
              value={npcName}
              name="npcName"
              onChange={handleTokenInputChange}
              type="text"
              placeholder="Demagorgon"
            />
            <select
              id="categorySelect"
              name="categorySelect"
              onChange={handleTokenInputChange}
            >
              {tokenCategories.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
            <select
              id="imageSelect"
              name="imageSelect"
              onChange={handleTokenInputChange}
            >
              <option>Choose Wisely...</option>
              {currentCategory === "Beasts" ? (
                <>
                  {Beasts.map((beast) => {
                    return <option value={beast.value}>{beast.name}</option>;
                  })}
                </>
              ) : null}
              {currentCategory === "Monstrositys" ? (
                <>
                  {Monstrositys.map((monstrosity) => {
                    return (
                      <option value={monstrosity.value}>
                        {monstrosity.name}
                      </option>
                    );
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
          <form className="my-5 py-5 text-center">
            <h4>Token Image</h4>
            <select
              id="charTokenSelect"
              name="charTokenSelect"
              onChange={handleTokenInputChange}
            >
              <option>Choose Wisely...</option>
              {charTokens.map((charToken) => {
                return (
                  <option value={charToken.value}>
                    {charToken.name} | {charToken.race} | {charToken.gender}
                  </option>
                );
              })}
            </select>
            <h4>Token Name</h4>
            <input
              className="m-6"
              id="charname"
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
