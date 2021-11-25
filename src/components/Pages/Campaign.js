import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import API from "../../utils/API";
function Campaign(props) {
    console.log(props);
    const { id } = useParams();

    const [campaignName,setCampaignName] = useState('');
    const [campaignDesc,setCampaignDesc] = useState('');
    const [gmID,setGMID] = useState('');
    const [edit,setEdit] = useState(false);
    const [nameEdit,setNameEdit] = useState('');
    const [descEdit,setDescEdit] = useState('');

    useEffect(() =>{
        API.findCampaign(id,props.token).then((res)=>{
            console.log(res);
            setCampaignName(res.data.name);
            setCampaignDesc(res.data.description);
            setNameEdit(res.data.name);
            setDescEdit(res.data.description);
            setGMID(res.data.gm_id);
        })
    },[])

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
    return (
    <div className="container">
        {edit ? (<input id="cmpgnName-edit" className="row" value={nameEdit} onChange={(e)=>setNameEdit(e.target.value)}/>) : (<h1 className="row">{campaignName}</h1>)}
        <div className="row">
            <button className="col-2 btn my-1 me-1">Launch Campaign</button>
            {(gmID === props.userState.id) ? (edit ? (<button className="col-2 btn m-1" onClick={()=>save()}>Save</button>) : (<button className="col-2 btn m-1" onClick={()=>setEdit(true)}>Edit Campaign</button>)) : ""}
        </div>
        <div className="row">
            {edit ? (<input id="cmpgnDesc-edit" className="col-4 m-1" value={descEdit} onChange={(e)=>setDescEdit(e.target.value)}/>) : (<p className="border col-4 m-1">{campaignDesc}</p>)}
            <div className="border col-4 m-1 text-center">
                <h2>GM</h2>
                <h4>gm_username</h4>
                <h2>Players</h2>
                <h4>player1_username</h4>
                <h4>userplayer2</h4>
                <h4>someotherUser</h4>
            </div>
            <div className="border col-3 m-1 text-center">
                <h2>Your Character(s)</h2>
                <h4>YourCharacterName</h4>
            </div>
        </div>
    </div>
    );
  }
  
  export default Campaign;