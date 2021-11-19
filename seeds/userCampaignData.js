const { UserCampaign } = require("../models");

const seedUserCampaign = async () => {
  const userCampaignData = await UserCampaign.bulkCreate([
    {
      campaign_id: 1,
      user_id: 1,
    },
    {
      campaign_id: 1,
      user_id: 2,
    },
    {
      campaign_id: 1,
      user_id: 3,
    },
    {
      campaign_id: 2,
      user_id: 1,
    },
    {
      campaign_id: 2,
      user_id: 2,
    },
    {
      campaign_id: 2,
      user_id: 3,
    },
  ]);
};

module.exports = seedUserCampaign;
