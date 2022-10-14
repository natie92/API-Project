const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User} = require("../../db/models");

// const { check, query } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// const validateSpot = [
//   check('address')
//     .exists({ checkFalsy: true })
//     .withMessage('Needs street address'),
//   check('city')
//     .exists({ checkFalsy: true })
//     .withMessage('Needs city'),
//   check('country')
//     .exists({ checkFalsy: true })
//     .withMessage('Needs country'),
//   check('state')
//     .exists({ checkFalsy: true })
//     .withMessage('Needs State'),
//   check('lat')
//     .exists({ checkFalsy: true })
//     .isNumeric({ checkFalsy: true })
//     .withMessage('Invalid Lat'),
//   check('lng')
//     .exists({ checkFalsy: true })
//     .isNumeric({ checkFalsy: true })
//     .withMessage('Invalid Lng'),
//   check("name")
//     .exists({ checkFalsy: true })
//     .isLength({ max: 80 })
//     .withMessage("Invalid name, must be less than 80 characters"),
//   check("description")
//     .exists({ checkFalsy: true })
//     .withMessage("Description must be entered"),
//   check("price")
//     .exists({ checkFalsy: true })
//     .isInt({ checkFalsy: true })
//     .withMessage("Price per night is needed"),
//   handleValidationErrors,
// ];

// Get all spots

router.get('/', async (req, res, next) => {
    let airbnbspots = await Spot.findAll()

    let spots = [];

    airbnbspots.forEach((location) => {
        spots.push(location)
    })

    console.log(spots)

    res.json(spots)
});


router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const userSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    let airbnbspots = [];

    userSpots.forEach((location)=> {
        airbnbspots.push(location)
    })
    console.log(airbnbspots)

    return res.json(airbnbspots)

});

router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;
    const currentSpot = await Spot.findAll({
        where: {
            id
        }
    })

    let airbnbspots = [];

    currentSpot.forEach((location) => {
        airbnbspots.push(location)
    })

    res.json(airbnbspots);
});


module.exports = router;
