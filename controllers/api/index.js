const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const blogRoutes = require("./blogController");
router.use("/blog",blogRoutes);

const campaignRoutes = require("./campaignController");
router.use("/campaigns",campaignRoutes);

const characterRoutes = require("./characterController");
router.use("/characters",characterRoutes);

const commentRoutes = require("./commentController");
router.use("/comments",commentRoutes);

const userRoutes = require("./userController");
router.use("/users",userRoutes);

module.exports = router;