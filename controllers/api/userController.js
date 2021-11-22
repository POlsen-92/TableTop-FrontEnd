const express = require("express");
const router = express.Router();
const { User, Campaign, Character, Blog, Comment } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Create New User
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({
      where: {
        email: email,
      },
    })
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
    })
    const token = jwt.sign(
      { id: user.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.dataValues.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//get all users
router.get("/", (req, res) => {
  User.findAll()
    .then((dbUsers) => {
      if (dbUsers.length) {
        res.json(dbUsers);
      } else {
        res.status(404).json({ err: "No users found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

// FIND USER BY ID - ALL
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Campaign, Character, Blog, Comment],
    });
    if (!userData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// FIND USER BY ID - GAME
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Campaign, Character],
    });
    if (!userData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// FIND USER BY ID - COMMUNITY
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Blog, Comment],
    });
    if (!userData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

//log a user in
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compareSync(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.dataValues.token = token;
      res.status(200).json(user);
    } else {
    res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

// FIND A SINGLE USER USING LOGIN CREDENTIALS  
router.get('/info', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, { //TODO: Need to fix this to reflect token use rather than sessions
      include: [Campaign, Character]
    });
    if (!userData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

//delete a user
router.delete("/:id", (req, res) => {
      User.destroy({
        where: {
          id: req.params.id,
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
    })



module.exports = router;