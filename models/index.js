const User = require('./User');
const Campaign = require ('./Campaign');
const Character = require ('./Character');
const UserCampaign = require ('./UserCampaign');
const Blog = require("./Blog");
const Comment = require("./Comment");

User.belongsToMany(Campaign, {
    through: "UserCampaign",
    unique: false,
    foreignKey: 'user_id',
})

Campaign.belongsToMany(User, {
    through: "UserCampaign",
    unique: false,
    foreignKey: 'campaign_id'
})

User.hasMany(Character, {
    foreignKey: 'user_id'
})

Character.belongsTo(User, {
    foreignKey: 'user_id'
})

Campaign.hasMany(Character, {
    foreignKey: 'campaign_id'
})

Character.belongsTo(Campaign, {
    foreignKey: 'campaign_id'
})
// for the community page, Marco
User.hasMany(Blog);

Blog.belongsTo(User);

Blog.hasMany(Comment);

Comment.belongsTo(Blog);

Comment.belongsTo(User);

User.hasMany(Comment);


module.exports = {User, Campaign, Character, UserCampaign, Blog, Comment};