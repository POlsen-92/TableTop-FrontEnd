import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"
import API from "../../utils/API";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Button, Card, Row, Col, FormControl } from "react-bootstrap";

// DATA POPULATION NEEDS NEW ROUTING ( DATA[0] user campain),,,, (DATA[1] gm capmpaigns
function Campaign(props) {
    // console.log('props',props);
    const navigate = useNavigate();
    const { id } = useParams();

    const [campaignName, setCampaignName] = useState('');
    const [campaignDesc, setCampaignDesc] = useState('');
    const [gmID, setGMID] = useState('');
    const [gm, setGM] = useState('')
    const [edit, setEdit] = useState(false);
    const [nameEdit, setNameEdit] = useState('');
    const [descEdit, setDescEdit] = useState('');
    const [invite, setInvite] = useState('');
    const [users, setUsers] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [inviteMsg, setInviteMsg] = useState("");
    const [show,setShow] = useState(false);

    useEffect(() => {
        API.findCampaign(id, props.token).then((res) => {
            // console.log(res);
            setCampaignName(res.data.name);
            setCampaignDesc(res.data.description);
            setNameEdit(res.data.name);
            setDescEdit(res.data.description);
            setGMID(res.data.gm_id);
            setUsers(res.data.Users);
            const campaignGM = res.data.Users.filter((user) => user.id === res.data.gm_id)
            setGM(campaignGM[0])
            setCharacters(res.data.Characters);

        })
    },[id,props])

    const createCharacter = () => {
        navigate(`/createcharacter/${id}`)
    }

    const textToHtml = (text) => {
      const elem = document.createElement('div');
      return text.split(/\n\n+/).map((paragraph) => {
        return '<p>' + paragraph.split(/\n+/).map((line) => {
          elem.textContent = line;
          return elem.innerHTML;
        }).join('<br/>') + '</p>';
      }).join('');
    };

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

    const leaveCampaign = (campaign_id) => {
      API.userDelUserCampaign(campaign_id, props.token).then((res)=>{
        console.log(res);
      })
      navigate('/profile')
    }
    const kickPlayer = (campaign_id,user_id) => {
      API.gmDelUserCampaign(campaign_id,user_id,props.token);
      window.location.reload();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            {(gmID === props.userState.id) ? (<button className="col-2 btn m-1" onClick={()=>handleShow()}>Kick Players</button>) : null}
            <button className="col-2 btn my-1 me-1" onClick={createCharacter}>Add Character</button>
            {(gmID !== props.userState.id) ? (<button className="col-2 btn my-1 me-1" onClick={()=> leaveCampaign(id)}>Leave Campaign</button>) : null}
        </div>
        <div className="row">
            {edit ? (
            <div className="col-sm-12 col-md-4 ">
              <Editor
                initialValue={textToHtml(campaignDesc)}
                apiKey={process.env.REACT_APP_TINYAPI}
                outputFormat='text'
                init={{
                  height: "100%",
                  width: "100%",
                  menubar: true,
                  skin: "oxide-dark",
                  content_css: "dark",
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent image | help",
                }}
                onEditorChange={(newDesc)=>setDescEdit(newDesc)}
              />
            </div>
            ) : (<div className="border col-sm-12 col-md-4 ">{campaignDesc}</div>)}
            <div className="border col-sm-12 col-md-4 text-center scrollMe">
                <h2>GM</h2>
                <h4>{gm.username}</h4>
                <h2>Players</h2>
                <ul className="p-0">
                {users.map((user, index)=>{
                    if (props.userState.id === user.id) {
                        return (
                          <Link
                            key={index}
                            to={{ pathname: `/Profile`}}
                            className="d-inline"
                          >
                            <li
                              key={index+1}
                              className="list-group-item list-group-item-action mb-3"
                              id="user"
                              data-id={user.id}
                            >
                              <h4 key={index+2}>{user.username}</h4>
                            </li>
                          </Link>
                        )
                    } else {
                        return (
                            <Link
                              key={index+3}
                              to={{ pathname: `/profile/${user.id}`}}
                              className="d-inline"
                            >
                              <li
                                key={index+4}
                                className="list-group-item list-group-item-action mb-3"
                                id="user"
                                data-id={user.id}
                              >
                                <h4 key={index+5}>{user.username}</h4>
                              </li>
                            </Link>
                          )
                    }
                })}</ul>
                <br />
                <br />
                {(gmID === props.userState.id) ? (<div className="row"><div className="col"><input value={invite} placeHolder="User Email" onChange={(e) => setInvite(e.target.value)} /><button className="btn m-1" onClick={() => sendInvite()}>Invite User</button><p>{inviteMsg}</p></div></div>) : ""}
            </div>
            <div className="border col-sm-12 col-md-4 text-center scrollMe">
                <h2>Character(s)</h2>
                <ul className="p-0 m-0">
                {characters.map((character,index) => {
                    return (
                        <Link
                        key={index}
                        to={{ pathname: `/character/${character.id}` }}
                        className="d-inline"
                      >
                        <li
                          key={index+1}
                          className="list-group-item list-group-item-action mb-3"
                          id="character"
                          data-id={character.id}
                        >
                          <h4 key={index+2}>{character.charName}</h4>
                        </li>
                      </Link>
                    );
                })}</ul>
            </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Users</Modal.Title>
              </Modal.Header>
              <Modal.Body>{users.map((user,index)=>((user.id !== props.userState.id) ? <div key={index}><h4 key={index+1}>{user.username}</h4><button key={index+2} onClick={()=>kickPlayer(id,user.id)}>Kick</button></div> : null))}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Campaign;