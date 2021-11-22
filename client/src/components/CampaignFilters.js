import React from "react";
function CampaignFilters({ handleCampaignFilterChange }) {
    return (
    <div id="campaign-filters">
        <button className="btn" id="gm-filter" onClick={() => handleCampaignFilterChange('gm')}>GM Campaigns</button>
        <button className="btn" id="player-filter" onClick={() => handleCampaignFilterChange('player')}>Player Campaigns</button>
        <button className="btn" id="all-filter" onClick={() => handleCampaignFilterChange('all')}>All</button>
    </div>
    );
  }
  
  export default CampaignFilters;