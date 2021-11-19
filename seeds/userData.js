const { User } = require("../models");

const seedUser = async () => {
  const userData = await User.bulkCreate(
    [
      {
        username: "joe",
        password: "password",
        email: "joe@joe.joe",
      },
      {
        username: "bob",
        password: "password",
        email: "bob@bob.bob",
      },
      {
        username: "carl",
        password: "password",
        email: "carl@carl.carl",
      },
    ],
    {
      individualHooks: true,
    }
  );
};

module.exports = seedUser;
