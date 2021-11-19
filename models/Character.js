const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
    {
        charName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        race: {
            type: DataTypes.STRING,
        },
        subRace: {
            type: DataTypes.STRING,
            default: '',
        },
        class: {
            type: DataTypes.STRING,
        },
        subClass: {
            type: DataTypes.STRING,
            default:'',
        },
        level: {
            type: DataTypes.INTEGER,
            default: 1
        },
        image_content: {
            type: DataTypes.STRING,
            default: '',
        }
    },
    {
        sequelize,
    },
)

module.exports = Character;