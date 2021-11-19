const { Campaign } = require("../models");

const seedCampaign = async () => {
    const campaignData = await Campaign.bulkCreate([
        {
          name: "the big sink",
        },
        {
          name: "the greats",
        },
      ]);
};

module.exports = seedCampaign;