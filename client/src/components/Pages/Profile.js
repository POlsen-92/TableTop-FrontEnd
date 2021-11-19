import React from "react";
function Profile({ handlePageChange,handleCampaignChange }) {
    return (
    <div className="container">
        <div className="row">
            <section className="col-4" id="campaigns">
                <h3>Your Campaigns</h3>
                <div id="campaign-filters">
                    <button className="btn" id="gm-filter">GM Campaigns</button>
                    <button className="btn" id="player-filter">Player Campaigns</button>
                    <button className="btn" id="all-filter">All</button>
                </div>
                <ul id="campaign-list list-group-flush list-group">
                    <li className="list-group-item list-group-item-action" id="example-campaign" data-Id="5"
                        onClick={(event) => {
                            const id = event.target.parentElement.getAttribute('data-Id');
                            handleCampaignChange(id);
                            handlePageChange('campaign');
                        }}>
                        <h4>Book of Losers</h4>
                    </li>
                </ul>
            </section>
            <section className="col-4" id="profile-info">
                <img/>
                <button className="btn">Change Profile Picture</button><br/>
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