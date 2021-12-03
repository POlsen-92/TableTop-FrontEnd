import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom"
import Character from "../Character/Character";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Table from "./VirTable/Table"
import API from "../../../utils/API"

const containerStyle = {
    height: '90vh',
    border: '1px solid gray',
    backgroundImage: `url(https://64.media.tumblr.com/2267f9cbe894a43c5d7170200035bfee/tumblr_p3yb76ZWh61x3jozbo1_1280.jpg)`,
    backgroundSize: '100% 100%'

};

function Gameplay(props) {
    console.log("my user_id",props.userState.id);
    const { socket } = props;
    const { id } = useParams();

    const [tab,setTab] = useState('characters');
    const [tabContents,setTabContents] = useState('');
    const [characters,setCharacters] = useState([]);
    const [CampaignName,setCampaignName] = useState('');

    useEffect(()=>{
        socket.emit("join campaign room", id);
    },[]);

    useEffect(()=>{
        API.findCampaign(id,props.token).then((res)=>{
            setCampaignName(res.data.name);
            const myChars = res.data.Characters.filter((character)=> character.user_id == props.userState.id)
            console.log("myChar",myChars);
            setCharacters(myChars);
        })
    },[props]);

    useEffect(()=>{
        switch(tab){
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
                            {characters.map((character)=>{
                                return (<li>{character.charName}</li>)
                            })}
                        </ul>
                    </div>
                )
            break;
        }
    },[tab,characters]);

    return (
    <div className="container-fluid p-0 m-0 border border-3 border-danger">
        <div className="row p-0 m-0">
            <div className="col-3 border border-primary border-4 char-menu"><h1></h1></div>
            <div className="col-7 border border-info border-4 gameboard" style={containerStyle}>
                <DndProvider  backend={HTML5Backend}>
					<Table camp_id={id}/>
				</DndProvider>
            </div>
            <div className="col-2 border border-success border-4 mini-menu">
                <div>
                    <button onClick={()=>setTab('characters')}>Char</button>
                    <button onClick={()=>setTab('compendium')}>Comp</button>
                    <button onClick={()=>setTab('settings')}>Sett</button>
                </div>
                <div className="tab-contents">
                    {tabContents}
                </div>
            </div>
        </div>
    </div>
    );
  }
export default Gameplay;