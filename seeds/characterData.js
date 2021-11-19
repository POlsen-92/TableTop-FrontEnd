const { Character } = require("../models");

const seedCharacter = async () => {
  const characaterData = await Character.bulkCreate([
    {
      charName: "Thor",
      race: "elf",
      subRace: "high-elf",
      class: "barbarian",
      user_id: 1,
      campaign_id: 1,
    },
    // {
    //   charName: "Carl",
    //   race: "gnome",
    //   class: "bard",
    //   user_id: 1,
    //   campaign_id: 1,
    // },
    // {
    //   charName: "Ryan",
    //   race: "dwarf",
    //   subClass: "hill-dwarf",
    //   class: "cleric",
    //   user_id: 2,
    //   campaign_id: 2,
    // },
    // {
    //   charName: "Bob",
    //   race: "half-orc",
    //   class: "druid",
    //   user_id: 2,
    //   campaign_id: 2,
    // },
    // {
    //   charName: "John",
    //   race: "human",
    //   class: "fighter",
    //   user_id: 3,
    //   campaign_id: 1,
    // },
    // {
    //   charName: "Alex",
    //   race: "tiefling",
    //   class: "ranger",
    //   user_id: 3,
    //   campaign_id: 2,
    // },
  ]);
};

module.exports = seedCharacter;
