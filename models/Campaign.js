const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Campaign extends Model {}

Campaign.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gm_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_content: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
    },
    
)

module.exports = Campaign;