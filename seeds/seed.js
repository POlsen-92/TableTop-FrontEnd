
const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedCharacter = require('./characterData');
const seedCampaign = require ('./campaignData');
const seedUserCampaign = require ('./userCampaignData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser()
  console.log('\n----- USERS SEEDED -----\n');

  await seedCampaign()
  console.log('\n----- CAMPAIGNS SEEDED -----\n');
  
  await seedCharacter()
  console.log('\n----- CHARACTERS SEEDED -----\n');
  
  await seedUserCampaign()
  console.log('\n----- USERCAMPAIGN SEEDED -----\n');
  
  process.exit(0);
};

seedDatabase();
