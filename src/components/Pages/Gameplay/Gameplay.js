import React, {useState,useEffect,Component} from "react";
import { useParams } from "react-router-dom"
import Character from "../Character/Character";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Gameboard from "./Gameboard/Gameboard"
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; for implementing zoom, currently not working with gameboard functionality

function Gameplay(props) {
    console.log(props);
    const { socket } = props;
    const { id } = useParams();

    const [chat, setChat] = useState([]);
    const [chatInput, setChatInput] = useState([]);

    useEffect(()=>{
        socket.emit("join campaign room", id);
    },[])

    const sendChat = (msg) => {
        const socketObj = {name:props.userState.username, content:msg, id,}
        console.log(socketObj);
        socket.emit("sending chat msg",socketObj)
    }

    socket.on("chat msg sent",(chatObj)=>{
        setChat([...chat,chatObj])
    })

    return (
    <div className="container-fluid p-0 m-0 border border-3 border-danger">
        <div className="row p-0 m-0">
            <div className="col-3 border border-primary border-4 char-menu"><h1></h1></div>
            <div className="col-6 border border-info border-4 gameboard" style={{ backgroundImage: `url(https://64.media.tumblr.com/2267f9cbe894a43c5d7170200035bfee/tumblr_p3yb76ZWh61x3jozbo1_1280.jpg)`, backgroundSize: "100% 100%" }}>
                <DndProvider backend={HTML5Backend}>
                {/* <TransformWrapper>
        <TransformComponent> */}
					<Gameboard/>
        {/* </TransformComponent>
      </TransformWrapper> */}
				</DndProvider>
            </div>
            <div className="col-3 border border-success border-4 mini-menu">
                <ul className="chat">
                    {chat.map((entry)=>{
                        return(
                            <li>
                                <h6>{entry.name}</h6>
                                <p>{entry.content}</p>
                            </li>
                        )
                    })}
                </ul>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    sendChat(chatInput);
                    setChatInput('');
                }}>
                    <input className="" value={chatInput} onChange={(e)=>setChatInput(e.target.value)}/>
                </form>
            </div>
        </div>
       
    </div>
    );
  }
export default Gameplay;