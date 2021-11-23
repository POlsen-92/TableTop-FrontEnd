const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword,this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        image_content: {
            type: DataTypes.STRING,
            default: 'https://avatars.dicebear.com/api/pixel-art/sdfsdfsdfsdfsdfs.svg'
        }
    },
    {
        hooks: {
            beforeCreate: async (newData) => {
                newData.password = await bcrypt.hash(newData.password, 10);
                return newData;
            },
            beforeUpdate: async (updateData) => {
                updateData.password = await bcrypt.hash(updateData.password, 10);
                return updateData;
            },
        },
        sequelize,
    },
)

module.exports = User;