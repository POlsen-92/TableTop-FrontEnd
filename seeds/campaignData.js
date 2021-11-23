const { Campaign } = require("../models");

const seedCampaign = async () => {
    const campaignData = await Campaign.bulkCreate([
        {
          name: "the big sink",
          gm_id:2,
        },
        {
          name: "the greats",
          gm_id:4,
        },
      ]);
};

module.exports = seedCampaign;