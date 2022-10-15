const express = require("express");
const { DATE } = require("sequelize");
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();








module.exports = router;
