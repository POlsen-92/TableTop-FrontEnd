const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserCampaign extends Model {}

UserCampaign.init(
  {
    campaign_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'campaign',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
      },
  },
  {
    sequelize,
  }
);

module.exports = UserCampaign;