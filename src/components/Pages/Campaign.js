import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"
import API from "../../utils/API";

// DATA POPULATION NEEDS NEW ROUTING ( DATA[0] user campain),,,, (DATA[1] gm capmpaigns
function Campaign(props) {
    // console.log(props);
    const navigate = useNavigate();
    const { id } = useParams();

    const [campaignName, setCampaignName] = useState('');
    const [campaignDesc, setCampaignDesc] = useState('');
    const [gmID, setGMID] = useState('');
    const [edit, setEdit] = useState(false);
    const [nameEdit, setNameEdit] = useState('');
    const [descEdit, setDescEdit] = useState('');
    const [invite, setInvite] = useState('');
    const [users, setUsers] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [inviteMsg, setInviteMsg] = useState("");

    useEffect(() => {
        API.findCampaign(id, props.token).then((res) => {
            console.log(res);
            setCampaignName(res.data.name);
            setCampaignDesc(res.data.description);
            setNameEdit(res.data.name);
            setDescEdit(res.data.description);
            setGMID(res.data.gm_id);
            setUsers(res.data.Users);
            const myChars = res.data.Characters.filter((character)=>character.user_id === props.userState.id)
            setCharacters(myChars);
            console.log(res.data.Characters)
        })
    },[id,props])

    const createCharacter = () => {
        navigate(`/createcharacter/${id}`)
    }

    const save = () => {
        const update = {
            name: nameEdit,
            description: descEdit,
        }
        API.updateCampaign(id, update, props.token).then((res) => console.log(res));
        setCampaignName(nameEdit);
        setCampaignDesc(descEdit);
        setEdit(false);
    }

    const sendInvite = () => {
        API.findUserByEmail(invite, props.token).then((res) => {
            const inviteObj = {
                campaign_id: id,
                user_id: res.data.id,
            }
            API.createInvite(inviteObj, props.token).then((response) => {
                setInvite("");
                setInviteMsg("Invite Sent");
                setTimeout(() => {
                    setInviteMsg("")
                }, 5000);
            });
        })
    }

    const deleteCampaign = (dltCmpgnId) => {
      API.deleteCampaign(dltCmpgnId, props.token);
      navigate('/profile');
    };

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
            {(gmID === props.userState.id) ? (edit ? (<button className="col-2 btn m-1" onClick={()=>save()}>Save</button>) : (<button className="col-2 btn m-1" onClick={()=>setEdit(true)}>Edit Campaign</button>)) : null}
            {(gmID === props.userState.id) ? (<button className="col-2 btn m-1" onClick={()=>deleteCampaign(id)}>Delete Campaign</button>) : null}
            <button className="col-2 btn my-1 me-1" onClick={createCharacter}>Add Character</button>
        </div>
        <div className="row">
            {edit ? (<input id="cmpgnDesc-edit" className="col-4 m-1" value={descEdit} onChange={(e)=>setDescEdit(e.target.value)}/>) : (<p className="border col-4 m-1">{campaignDesc}</p>)}
            <div className="border col-4 m-1 text-center">
                <h2>GM</h2>
                <h4>gm_username</h4>
                <h2>Players</h2>
                {users.map((user)=>{
                    if (props.userState.id === user.id) {
                        return (
                          <Link
                            to={{ pathname: `/Profile`}}
                            className="d-inline"
                          >
                            <li
                              key={user.id}
                              className="list-group-item list-group-item-action m-3"
                              id="user"
                              data-id={user.id}
                            >
                              <h4>{user.username}</h4>
                            </li>
                          </Link>
                        )
                    } else {
                        return (
                            <Link
                              to={{ pathname: `/profile/${user.id}`}}
                              className="d-inline"
                            >
                              <li
                                key={user.id}
                                className="list-group-item list-group-item-action m-3"
                                id="user"
                                data-id={user.id}
                              >
                                <h4>{user.username}</h4>
                              </li>
                            </Link>
                          )
                    }
                })}
            </div>
            <div className="border col-3 m-1 text-center">
                <h2>Character(s)</h2>
                {characters.map((character) => {
                    return (
                        <Link
                        to={{ pathname: `/character/${character.id}` }}
                        className="d-inline"
                      >
                        <li
                          key={character.id}
                          className="list-group-item list-group-item-action m-3"
                          id="character"
                          data-id={character.id}
                        >
                          <h4>{character.charName}</h4>
                        </li>
                      </Link>
                    );
                })}
            </div>
            </div>
            {(gmID === props.userState.id) ? (<div className="row gm-invite"><div className="col-4"><input value={invite} onChange={(e) => setInvite(e.target.value)} /><button className="btn m-1" onClick={() => sendInvite()}>Invite User</button><p>{inviteMsg}</p></div></div>) : ""}
        </div>
    );
}

export default Campaign;