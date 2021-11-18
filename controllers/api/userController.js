const express = require("express");
const router = express.Router();
const { User, Note } = require("../../models");
const bcrypt = require("bcrypt");

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

//create user

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
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
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid email or password" });
        });
      }
      if (!req.body.password) {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid email or password" });
        });
      }
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.user = {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username,
        };
        return res.json({
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        });
      } else {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid email or password" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

//log out a user

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//get a user and there associated notes

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [Note],
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

//delete a user

router.delete("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "not logged in" });
  }
  User.findByPk(req.params.id)
    .then((found) => {
      if (found.id !== req.session.user.id) {
        return res.status(403).json({ err: "not your account" });
      }
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
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

module.exports = router;