import React, {useEffect, useState} from "react";
import CampaignFilters from "./../CampaignFilters";
import API from "../../utils/API"

function Profile(props) {
    console.log(props.userState.id);

    function goToCampaign (event) {
            const id = event.target.parentElement.getAttribute('data-id');
            props.handleCampaignChange(id); // function declared in app.js
            props.handlePageChange('campaign');
    }

    const [campaignFilter,setCampaignFilter] = useState('all');
    const [data, setData] = useState([]);
    const [displayData,setDisplayData] = useState([]);

    const handleCampaignFilterChange = (filter) => {
        setCampaignFilter(filter);
        const newArr = data.filter((campaign) => {
            switch(filter){
                case "gm":
                    return campaign.gm_id === props.userState.id
                case "player":
                    return campaign.gm_id !== props.userState.id
                case "all":
                    return true;
            }
        });
        setDisplayData(newArr);
    }

    const createCampaign = () => {
        const createdCampaign = {
            name: "Untitled Campaign",
            description: "Insert description here",
        }
        API.createCampaign(createdCampaign,props.token).then((res) => {
            console.log(res);
            setData([...data, res.data]);
            console.log("i created a campaign!");
        })
    }

    useEffect(()=> {
        API.findSelf(props.token).then((res)=>{
            console.log(res);
            setData(res.data.Campaigns)
        });
    },[])

    useEffect(()=>{
        console.log("i am code that ran!");
        handleCampaignFilterChange(campaignFilter);
    },[data])

    return (
    <div className="container">
        <div className="row text-center">
            <section className="col-4" id="campaigns">
                <h3>Your Campaigns</h3>
                <CampaignFilters handleCampaignFilterChange={handleCampaignFilterChange}/>
                {displayData.map((campaign) => {
                        return (
                            <li key={campaign.id} className="list-group-item list-group-item-action m-3" id="example-campaign"
                                onClick={(event) => {goToCampaign(event)}}>
                                <h4>{campaign.name}</h4>
                            </li>
                        )
                })}
                <button onClick={()=>{createCampaign()}}>Create Campaign</button>
            </section>
            <section className="col-4" id="profile-info">
                <h2>{props.userState.username}</h2>
                <img src={props.userState.image_content} width="200" height="auto" alt={""} className="m-1"/> <br/>
                <button onClick={()=> props.handlePageChange('avatar')} className="btn m-1">Change Profile Picture</button><br/>
                <button className="btn m-1">Change Username</button><br/>
                <button className="btn m-1">Change Email</button><br/>
                <button className="btn m-1">Notifications</button>
            </section>
            <section className="col-4" id="character-presets">
            <h3>Your Presets</h3>
            <div id="preset-filters">
                <input className="m-1"/>
                <button className="btn m-1" id="player-filter">Search</button>
                <button className="btn m-1" id="all-filter">Filters</button>
            </div>
            <ul id="presets-list list-group-flush list-group">
                <li className="list-group-item list-group-item-action" id="example-preset"
                    onClick={() => props.handlePageChange('home')}>
                    <h4>Knight Rogue</h4>
                </li>
            </ul>
            </section>
        </div>
    </div>
    );
  }
  
  export default Profile;