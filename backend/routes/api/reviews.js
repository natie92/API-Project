const express = require("express");
const { Spot, SpotImage, User, Review, ReviewImage } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const sequelize = require("sequelize");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
















module.exports = router;
