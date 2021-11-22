import React, {useState} from "react";
import CampaignFilters from "./../CampaignFilters";

function Profile({ handlePageChange,handleCampaignChange }) {
    console.log('everything shouldnt be breaking!!!!');
    const userID = 14;
    const camdata = [
        {
            name: "Book of Losers",
            id:12,
            gm_id:14
        },
        {
            name: "Book of Winners",
            id:13,
            gm_id:19
        }
    ];

    const getUserInfo = JSON.parse(localStorage.getItem("token"))
    console.log(getUserInfo)   
    
    function goToCampaign (event) {
            const id = event.target.parentElement.getAttribute('data-id');
            handleCampaignChange(id); // function declared in app.js
            handlePageChange('campaign');
    }

    const [campaignFilter,setCampaignFilter] = useState('all');
    const [data, setData] = useState(camdata);
    const [displayData,setDisplayData] = useState(camdata);
    const handleCampaignFilterChange = (filter) => {
        setCampaignFilter(filter);
        const newArr = data.filter((campaign) => {
            switch(filter){
                case "gm":
                    return campaign.gm_id === userID
                case "player":
                    return campaign.gm_id !== userID
                case "all":
                    return true;
            }
        });
        setDisplayData(newArr);
    }

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
                {/* <li key={campaign.id} className="list-group-item list-group-item-action" id="example-campaign"
                        onClick={(event) => {goToCampaign(event)}}>
                        <h4>{campaign.name}</h4>
                </li> */}
            </section>
            <section className="col-4" id="profile-info">
                <img src={getUserInfo.image_content} width="200" height="auto" alt={""}/>
                <button onClick={()=> handlePageChange('avatar')} className="btn">Change Profile Picture</button><br/>
                <h2>{getUserInfo.username}</h2>
                <button className="btn">Change Username</button><br/>
                <button className="btn">Change Email</button><br/>
                <button className="btn">Notifications</button>
            </section>
            <section className="col-4" id="character-presets">
            <h3>Your Campaigns</h3>
            <div id="preset-filters">
                <input/>
                <button className="btn" id="player-filter">Search</button>
                <button className="btn" id="all-filter">Filters</button>
            </div>
            <ul id="presets-list list-group-flush list-group">
                <li className="list-group-item list-group-item-action" id="example-preset"
                    onClick={() => handlePageChange('home')}>
                    <h4>Knight Rogue</h4>
                </li>
            </ul>
            </section>
        </div>
    </div>
    );
  }
  
  export default Profile;