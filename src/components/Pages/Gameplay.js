import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom"

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
            <div className="col-3 border border-primary border-4"><h1></h1></div>
            <div className="col-7 border border-info border-4"></div>
            <div className="col-2 border border-success border-4">
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