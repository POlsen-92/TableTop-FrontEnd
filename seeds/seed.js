const sequelize = require("../config/connection");
const { User } = require("../models");

const seed = async () => {
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

sequelize.sync({ force: true }).then(() => {
  seed();
});
