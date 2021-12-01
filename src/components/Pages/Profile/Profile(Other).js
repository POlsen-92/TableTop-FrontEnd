import React, { useEffect, useState } from "react";
import CampaignFilters from "../../CampaignFilters";
import API from "../../../utils/API";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile(props) {

    const navigate = useNavigate();
    const { id } = useParams();


    const [campaignFilter, setCampaignFilter] = useState("all");
    const [displayData, setDisplayData] = useState([]);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [picture,setPicture] = useState('');
    const [campaigns,setCampaigns] = useState([]);
    const [characters,setCharacters] = useState([]);

    useEffect(() => {
        API.findUserById(id).then((res)=>{
            setUsername(res.data.username);
            setEmail(res.data.email);
            setCampaigns(res.data.Campaigns);
            setCharacters(res.data.Characters);
            setPicture(res.data.image_content)
        })
    },[id])

    const handleCampaignFilterChange = (filter) => {
        setCampaignFilter(filter);
        const newArr = campaigns.filter((campaign) => {
          switch (filter) {
            case "gm":
              return campaign.gm_id === id;
            case "player":
              return campaign.gm_id !== id;
            case "all":
              return true;
            default:
              return true;
          }
        });
        setDisplayData(newArr);
      };

    useEffect(() => {
      handleCampaignFilterChange(campaignFilter);
    }, [campaignFilter]);

    return (
        <div className="container">
          <div className="col-12 ">
            <h1 className="text-center m-4">{username}</h1>
          </div>
        <div className="row text-center">
          <section className="col-4 border" id="campaigns">
            <h3>Campaigns</h3>
            <CampaignFilters
              handleCampaignFilterChange={handleCampaignFilterChange}
            />
            {displayData.map((campaign) => {
              return (
                <div className="campaign-list-box">
                  <Link
                    to={{ pathname: `/campaign/${campaign.id}` }}
                    className="d-inline d-flex justify-content-center"
                  >
                    <li
                      key={campaign.id}
                      className="list-group-item list-group-item-action m-3"
                      id="example-campaign"
                      data-id={campaign.id}
                    >
                      <h4 className="d-inline">{campaign.name}</h4>
                    </li>
                  </Link>
                </div>
              );
            })}
          </section>
          <section className="col-4" id="profile-info">
            <img
              src={picture}
              width="200"
              height="auto"
              alt={""}
              className="m-1"
            />{" "}
            <br />
          </section>
          <section className="col-4 border" id="character">
            <h3>Characters</h3>
                {characters.map((character) => {
                    return (
                        <Link
                        to={{ pathname: `/character/${character.id}` }}
                        className="d-inline d-flex justify-content-center"
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
          </section>
        </div>
        
      </div>
    );
}