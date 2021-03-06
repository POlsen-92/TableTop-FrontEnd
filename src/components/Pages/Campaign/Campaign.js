import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import API from "../../../utils/API";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Button } from "react-bootstrap";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.css";
import "./Campaign.css"


function Campaign(props) {
  // GETTING ALL INFO ON PAGE LOAD
    const navigate = useNavigate();
    const { id } = useParams();

    const [campaignName, setCampaignName] = useState('');
    const [campaignDesc, setCampaignDesc] = useState('');
    const [gmID, setGMID] = useState('');
    const [gm, setGM] = useState('')
    const [users, setUsers] = useState([]);
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        API.findCampaign(id, props.token).then((res) => {
            setCampaignName(res.data.name);
            setCampaignDesc(res.data.description);
            setUsers(res.data.Users);
            setCharacters(res.data.Characters);
            const campaignGM = res.data.Users.filter((user) => user.id === res.data.gm_id)
            setGMID(res.data.gm_id);
            setGM(campaignGM[0])
            setNameEdit(res.data.name);
            setDescEdit(res.data.description);
        })
    },[id,props])

  // PURIFIES INPUT FROM TINYMCE SO THAT IT CAN BE READ PROPERLY
    useEffect(() => {
      setCampaignDesc({campaignDesc: DOMPurify.sanitize(campaignDesc)})
    },[])


  // CAMPAIGN HEADER BUTTONS
    const deleteCampaign = (dltCmpgnId) => {
      if(window.confirm("Do You Really Want To Delete This Spell?")) {
          API.deleteCampaign(dltCmpgnId, props.token);
          navigate('/profile');
      } else {
          alert("comment was not deleted")
      }
    };

    const leaveCampaign = (campaign_id) => {
      API.userDelUserCampaign(campaign_id, props.token)
      navigate('/profile')
    }
    
    const kickPlayer = (campaign_id,user_id) => {
      API.gmDelUserCampaign(campaign_id,user_id,props.token);
      window.location.reload();
    }

    const createCharacter = () => {
        navigate(`/createcharacter/${id}`)
    }

  // EDIT CAMPAIGN INFORMATION
    const [edit, setEdit] = useState(false);
    const [nameEdit, setNameEdit] = useState('');
    const [descEdit, setDescEdit] = useState('');

    const save = () => {
        const update = {
            name: nameEdit,
            description: descEdit,
        }
        API.updateCampaign(id, update, props.token).then(() => {
          setCampaignName(nameEdit);
          setCampaignDesc(descEdit);
          setEdit(false);
        }).catch((err) => {
          console.log(err)
        });
    }

  // CAMPAIGN INVITES
    const [invite, setInvite] = useState('');
    const [inviteMsg, setInviteMsg] = useState("");

    const sendInvite = () => {
        API.findUserByEmail(invite, props.token).then((res) => {
            const inviteObj = {
                campaign_id: id,
                user_id: res.data.id,
            }
            API.createInvite(inviteObj, props.token).then(() => {
                setInvite("");
                setInviteMsg("Invite Sent");
                setTimeout(() => {
                    setInviteMsg("")
                }, 5000);
            }).catch((err) => {
              console.log(err)
            });
        }).catch((err) => {
          console.log(err)
        });
    }


  // MODAL ACTIONS
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
    <div className="container">
      <br />
      {/* CAMPAIGN HEADER AND BUTTONS */}
        {edit ? (<input id="cmpgnName-edit" className="row inputColor h1 py-1" value={nameEdit} onChange={(e)=>setNameEdit(e.target.value)}/>) : (<h1 className="row">{campaignName}</h1>)}
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
        {/* CAMPAIGN DESCRIPTION */}
        <div className="row">
            {edit ? (
            <div className="col-sm-12 col-md-4 ">
              <Editor
                initialValue={campaignDesc}
                apiKey={process.env.REACT_APP_TINYAPI}
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
                onChange={(e) => setDescEdit(e.target.getContent())}
              />
            </div>
            ) : (<div className="border col-sm-12 col-md-4 scrollMe"><span dangerouslySetInnerHTML={{__html: campaignDesc}}></span></div>)}
            {/* CAMPAIGN PLAYERS */}
            <div className="border col-sm-12 col-md-4 text-center scrollMe">
                <h2>GM</h2>
                <h4>{gm.username}</h4>
                <h2>Players</h2>
                <ul className="p-0">
                {users.map((user, index)=>{
                    if (props.userState.id === user.id) {
                        return (
                          <div>
                            <li
                              key={index+1}
                              className="li mb-3 inputColor"
                              data-id={user.id}
                              onClick={()=> navigate('/Profile')}
                            >
                              <h4 key={index+2}>{user.username}</h4>
                            </li>
                          </div>
                        )
                    } else {
                        return (
                            <div>
                              <li
                                key={index+4}
                                className="li mb-3 inputColor"
                                data-id={user.id}
                                onClick={()=> navigate(`/profile/${user.id}`)}
                              >
                                <h4 key={index+5}>{user.username}</h4>
                              </li>
                            </div>
                      )}
                })}
                </ul>
                <br />
                <br />
                {(gmID === props.userState.id) ? (<div className="row"><div className="col"><input value={invite} className="inputColor" placeholder="User Email" onChange={(e) => setInvite(e.target.value)} /><button className="btn m-1" onClick={() => sendInvite()}>Invite User</button><p>{inviteMsg}</p></div></div>) : ""}
            </div>
            {/* CAMPAIGN CHARACTERS */}
            <div className="border col-sm-12 col-md-4 text-center scrollMe">
                <h2>Character(s)</h2>
                <ul className="p-0 m-0">
                {characters.map((character,index) => {
                    return (
                      <div>
                        <li
                          key={index+1}
                          className="li mb-3 inputColor"
                          id="character"
                          data-id={character.id}
                          onClick={()=>navigate(`/character/${character.id}`)}
                        >
                          <h4 key={index+2}>{character.charName}</h4>
                        </li>
                      </div>
                    );
                })}</ul>
            </div>
            </div>
            {/* KICK PLAYER MODAL */}
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