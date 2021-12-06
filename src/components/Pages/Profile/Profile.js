import React, { useEffect, useState } from "react";
import CampaignFilters from "./CampaignFilters";
import API from "../../../utils/API";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Avatar from "../UpdateUserInfo/Avatar";
import Username from "../UpdateUserInfo/Username";
import Password from "../UpdateUserInfo/Password";
import Email from "../UpdateUserInfo/Email";
import "./Profile.css";

function Profile(props) {
  const navigate = useNavigate();

  //IF NOT SIGNED IN REDIRECT TO HOMEPAGE
  useEffect(() => {
    if (!props.token) {
      navigate("/");
    }
  }, [props.token, navigate]);

  // ~~~~~~~~~~~~~~~USER INFORMATION~~~~~~~~~~~~~~~~~~~~~//

  const [imageURL, setImageURL] = useState("");
  const [updatePic, setUpdatePic] = useState(false);
  const [username, setUsername] = useState("");
  const [updateUsername, setUpdateUsername] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [updateEmail, setUpdateEmail] = useState(false);
  const [allMyCharacters, setAllMyCharacters] = useState([]);

  // ~~~~~~~~~~~~~~~~CAMPAIGN INFORMATION ~~~~~~~~~~~~~~~~~~~~~~//

  const [campaignFilter, setCampaignFilter] = useState("all");
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  //ALLOWS FOR USER TO LOOK BETWEEN CAMPAIGN TYPES (PLAYER/GM)
  const handleCampaignFilterChange = (filter) => {
    setCampaignFilter(filter);
    const newArr = data.filter((campaign) => {
      switch (filter) {
        case "gm":
          return campaign.gm_id === props.userState.id;
        case "player":
          return campaign.gm_id !== props.userState.id;
        case "all":
          return true;
        default:
          return true;
      }
    });
    setDisplayData(newArr);
  };

  //FINDS ALL CAMPAIGNS AND ALL USERS
  useEffect(() => {
    if (!props.token) {
    } else {
      API.findSelf(props.token)
        .then((res) => {
          setData(res.data.Campaigns);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    API.findCharacterbyUser(props.userState.id).then((response) => {
      setAllMyCharacters(response.data);
    });
  }, [props]);

  //DETERMINES WHAT CAMPAIGNS SHOW UP ON PAGE LOAD
  useEffect(() => {
    handleCampaignFilterChange(campaignFilter);
  }, [data]);

  //CREATES CAMPAIGN
  const createCampaign = () => {
    setCampaignFilter("all");
    const createdCampaign = {
      name: "Untitled Campaign",
      description: "Insert description here",
    };
    API.createCampaign(createdCampaign, props.token).then((res) => {
      console.log("res1", res);
      setData([...data, res.data[0]]);
    });
  };

  // ~~~~~~~~~~~~~~~~INVITE INFORMATION ~~~~~~~~~~~~~~~~~~~~~~//

  const [invites, setInvites] = useState([]);

  //FINDS ALL INVITES FOR USER
  useEffect(() => {
    if (!props.token) {
      console.log("No Token");
    } else {
      API.findSelf(props.token).then((res) => {
        let tempInvites = res.data.Invites;
        for (let i = 0; i < tempInvites.length; i++) {
          API.findCampaign(tempInvites[i].campaign_id, props.token).then(
            (res) => {
              tempInvites[i].campaign_name = res.data.name;
              setInvites(tempInvites);
            }
          );
        }
      });
    }
  }, [props.token]);

  //ACCEPTS INVITE
  const acceptInvite = (campid, id) => {
    API.createUserCampaign(campid, props.token).then(() => {
      API.deleteInvite(id, props.token).then(() => {
        API.findCampaign(campid, props.token).then((res) => {
          setData([...data, res.data]);
          removeInvite(id);
        });
      });
    });
  };

  //DECLINES INVITE
  const declineInvite = (id) => {
    API.deleteInvite(id, props.token).then(() => {
      removeInvite(id);
    });
  };

  //REMOVES INVITE EITHER ON ACCEPT OR DELETE
  const removeInvite = (id) => {
    const newInvites = invites.filter((invite) => {
      return invite.id !== id;
    });
    setInvites(newInvites);
  };

  //PAGE EXPRESSION
  return (
    <div className="container">
      {/* USER USERNAME AND EMAIL */}
      <div className="row">
        <h1 className="text-center m-2">
          {username ? username : props.userState.username}
        </h1>
        <h2 className="text-center m-2">
          {email ? email : props.userState.email}
        </h2>
      </div>
      {/* CAMPAIGN INFORMATION FOR USER */}
      <div className="row text-center">
        <section className="col-sm-12 col-md-4 border scrollMe" id="campaigns">
          <h3>Your Campaigns</h3>
          <CampaignFilters
            handleCampaignFilterChange={handleCampaignFilterChange}
          />
          {displayData.map((campaign, index) => {
            return (
              <div key={index+1} className="campaign-list-box">
                  <li
                    key={index+2}
                    className="m-3 li"
                    onClick={()=> navigate(`/campaign/${campaign.id}`)}
                  >
                    <h4 key={index+3} className="d-inline">{campaign.name}</h4>
                  </li>
              </div>
            );
          })}
          <button onClick={() => createCampaign()}>
            Create Campaign
          </button>
        </section>
        {/* USER INFORMATION - EDIT IMAGE, USERNAME, PASSWORD, EMAIL  */}
        <section className="col-sm-12 col-md-4" id="profile-info">
          <img
            src={imageURL ? imageURL : props.userState.image_content}
            width="200"
            height="auto"
            alt="ProfilePic"
            className="m-1"
          />
          <br />
          <button onClick={() => setUpdatePic(!updatePic)} className="btn m-1">
            Change Profile Picture
          </button>
          <br/>
          {updatePic ? (
            <Avatar
              imageURL={imageURL}
              setImageURL={setImageURL}
              userState={props.userState}
              token={props.token}
              setUserState={props.setUserState}
              setUpdatePic={setUpdatePic}
            />
          ) : null}
          <button
            onClick={() => setUpdateUsername(!updateUsername)}
            className="btn m-1"
          >
            Change Username
          </button>
          <br />
          {updateUsername ? (
            <Username
              userState={props.userState}
              setUserState={props.setUserState}
              token={props.token}
              setUpdateUsername={setUpdateUsername}
              username={username}
              setUsername={setUsername}
            />
          ) : null}
          <button
            onClick={() => setUpdatePassword(!updatePassword)}
            className="btn m-1"
          >
            Change Password
          </button>
          <br />
          {updatePassword ? (
            <Password
              userState={props.userState}
              setUserState={props.setUserState}
              token={props.token}
              setUpdatePassword={setUpdatePassword}
              email={email}
              setEmail={setEmail}
            />
          ) : null}
          <button
            onClick={() => setUpdateEmail(!updateEmail)}
            className="btn m-1"
          >
            Change Email
          </button>
          <br />
          {updateEmail ? (
            <Email
              userState={props.userState}
              token={props.token}
              setUpdateEmail={setUpdateEmail}
              setEmail={setEmail}
            />
          ) : null}
          <button className="btn m-1">Notifications</button>
        </section>
        {/* ALL CHARACTERS FOR USER */}
        <section
          className="col-sm-12 col-md-4 border scrollMe"
          id="all-characters-list"
        >
          <h3>Your Characters</h3>
          <ul className="p-0">
            {allMyCharacters ? allMyCharacters.map((character, index) => {
                  return (
                    <div>
                      <li
                        key={index+1}
                        className="li m-3"
                        onClick={()=> navigate(`/character/${character.id}`)}
                      >
                        <h5 key={index + 2}>{character.charName}</h5>
                        <h6 key={index + 3}>{character.Campaign.name}</h6>
                      </li>
                    </div>
                  );
                })
              : null}
          </ul>
        </section>
      </div>
      {/* ALL INVITES FOR USER */}
      <div className="row">
        <ul className="invites-list list-group-flush list-group">
          {invites.map((invite,index) => {
            return (
              <div key={index+1}className="campaign-list-box">
                <li
                  key={index+2}
                  className="list-group-item list-group-item-action m-3"
                >
                  You are invited to: {invite.campaign_name}
                </li>
                <button
                  key={index+3}
                  className="btn"
                  onClick={() => acceptInvite(invite.campaign_id, invite.id)}
                >
                  Accept
                </button>
                <button
                key={index+4}
                  className="btn"
                  onClick={() => declineInvite(invite.id)}
                >
                  Decline
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
