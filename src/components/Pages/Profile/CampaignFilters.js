import React from "react";

function CampaignFilters({ handleCampaignFilterChange }) {
    return (
        <div id="campaign-filters">
            <button className="btn m-1" id="gm-filter" onClick={() => handleCampaignFilterChange('gm')}>GM Campaigns</button>
            <button className="btn m-1" id="player-filter" onClick={() => handleCampaignFilterChange('player')}>Player Campaigns</button>
            <button className="btn m-1" id="all-filter" onClick={() => handleCampaignFilterChange('all')}>All</button>
        </div>
    );
}

export default CampaignFilters;