const { User } = require("../models");

const seedUser = async () => {
  const userData = await User.bulkCreate(
    [
      {
        username: "joe",
        password: "password",
        email: "joe@joe.joe",
        image_content: 'https://avatars.dicebear.com/api/pixel-art/sdfsdf.svg'
      },
      {
        username: "bob",
        password: "password",
        email: "bob@bob.bob",
        image_content: 'https://avatars.dicebear.com/api/pixel-art/asfsdf.svg'
      },
      {
        username: "carl",
        password: "password",
        email: "carl@carl.carl",
        image_content: 'https://avatars.dicebear.com/api/pixel-art/asdff.svg'
      },
    ],
    {
      individualHooks: true,
    }
  );
};

module.exports = seedUser;
