import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import API from "../../utils/API";

// DATA POPULATION NEEDS NEW ROUTING ( DATA[0] user campain),,,, (DATA[1] gm capmpaigns
function Campaign(props) {
    // console.log(props);
    const navigate = useNavigate();
    const { id } = useParams();

    const [campaignName,setCampaignName] = useState('');
    const [campaignDesc,setCampaignDesc] = useState('');
    const [gmID,setGMID] = useState('');
    const [edit,setEdit] = useState(false);
    const [nameEdit,setNameEdit] = useState('');
    const [descEdit,setDescEdit] = useState('');
    const [invite,setInvite] = useState('');
    const [users,setUsers] = useState([]);
    const [characters,setCharacters] = useState([]);
    const [inviteMsg,setInviteMsg] = useState("");

    useEffect(() =>{
        API.findCampaign(id,props.token).then((res)=>{
            // console.log(res);
            setCampaignName(res.data.name);
            setCampaignDesc(res.data.description);
            setNameEdit(res.data.name);
            setDescEdit(res.data.description);
            setGMID(res.data.gm_id);
            setUsers(res.data.Users);
            setCharacters(res.data.Characters)
        })
    },[])

    const createCharacter = () => {
        navigate(`/createcharacter/${id}`)
    }

    const save = () => {
        const update = {
            name: nameEdit,
            description: descEdit,
        }
        API.updateCampaign(id,update,props.token).then((res)=>console.log(res));
        setCampaignName(nameEdit);
        setCampaignDesc(descEdit);
        setEdit(false);
    }

    const sendInvite = () => {
        API.findUserByEmail(invite,props.token).then((res)=>{
            const inviteObj = {
                campaign_id: id,
                user_id:res.data.id,
            }
            API.createInvite(inviteObj,props.token).then((response)=>{
                setInvite("");
                setInviteMsg("Invite Sent");
                setTimeout(() => {
                    setInviteMsg("")
                },5000);
            });
        })
    }

    return (
    <div className="container">
        {edit ? (<input id="cmpgnName-edit" className="row" value={nameEdit} onChange={(e)=>setNameEdit(e.target.value)}/>) : (<h1 className="row">{campaignName}</h1>)}
        <div className="row">
            <button 
                className="col-2 btn m-1"
                onClick={()=>{
                    navigate(`/play/${id}`)
                }}
            >Launch Campaign</button>
            {(gmID === props.userState.id) ? (edit ? (<button className="col-2 btn m-1" onClick={()=>save()}>Save</button>) : (<button className="col-2 btn m-1" onClick={()=>setEdit(true)}>Edit Campaign</button>)) : ""}
            <button className="col-2 btn my-1 me-1" onClick={createCharacter}>Add Character</button>
        </div>
        <div className="row">
            {edit ? (<input id="cmpgnDesc-edit" className="col-4 m-1" value={descEdit} onChange={(e)=>setDescEdit(e.target.value)}/>) : (<p className="border col-4 m-1">{campaignDesc}</p>)}
            <div className="border col-4 m-1 text-center">
                <h2>GM</h2>
                <h4>gm_username</h4>
                <h2>Players</h2>
                {users.map((user)=>{
                    return (<h4>{user.name}</h4>)
                })}
            </div>
            <div className="border col-3 m-1 text-center">
                <h2>Your Character(s)</h2>
                {characters.map((character) => {
            return (<h4>{character.name}</h4>);
          })}
            </div>
        </div>
        {(gmID === props.userState.id) ? (<div className="row gm-invite"><div className="col-4"><input value={invite} onChange={(e)=>setInvite(e.target.value)}/><button className="btn m-1" onClick={()=>sendInvite()}>Invite User</button><p>{inviteMsg}</p></div></div>): ""}
    </div>
    );
  }
  
  export default Campaign;