const express = require("express");
const router = express.Router();
const { User, Campaign, Character, Blog, Comment } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
require("dotenv").config();

//Create New User
router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email.toLowerCase(),
    image_content: req.body.image_content,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

//log a user in
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).send("incorrect email or password");
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const token = jwt.sign(
          {
            email: foundUser.email,
            id: foundUser.id,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.json({
          token: token,
          user: foundUser,
        });
      } else {
        res.status(401).send("incorrect email or password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// FIND A SINGLE USER USING LOGIN CREDENTIALS
router.get("/profile", tokenAuth, (req, res) => {
  User.findByPk(req.user.id).then((foundUser) => {
    res.json(foundUser);
  });
});

//delete a user
router.delete("/", tokenAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.user.id,
    },
  })
    .then((delUser) => {
      if (delUser) {
        res.json(delUser);
      } else {
        res.status(404).json({ err: "no user found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

// FIND USER BY ID - AND UPDATE
router.put("/update", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id);
    if (!userData) {
      res.status(404).json({ message: "No User found with that id!" });
      return;
    }
    const updateUser = await User.update(req.body, {
      where: { id: req.user.id },
    });
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//************** routes above are corrected to current way of doing things





// //get all users
// router.get("/", (req, res) => {
//   User.findAll()
//     .then((dbUsers) => {
//       if (dbUsers.length) {
//         res.json(dbUsers);
//       } else {
//         res.status(404).json({ err: "No users found!" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ err: "an error occurred" });
//     });
// });

// // FIND USER BY ID - ALL
// router.get("/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [Campaign, Character, Blog, Comment],
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No User found with that id!" });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // FIND USER BY ID - GAME
// router.get("/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [Campaign, Character],
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No User found with that id!" });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // FIND USER BY ID - COMMUNITY
// router.get("/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [Blog, Comment],
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No User found with that id!" });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
