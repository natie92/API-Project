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
    const noSpot = await Spot.findByPk(id);

    if (!noSpot) {
        const err = new Error("Spot could not be found")
        err.status = 404;

        return next(err);
    }
    const currentSpot = await Spot.findAll({
        where: {
            id
        },
        include: [
            { model: User}
        ]
    })

    let airbnbspots = [];

    currentSpot.forEach((location) => {
        airbnbspots.push(location)
    })

    airbnbspots.forEach((spot) => {
        spot.Owner = spot.User
        airbnbspots.push(spot)
    })

    res.json(airbnbspots);
});

router.post('/', requireAuth, async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id)
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    const isValidSpot = await Spot.findAll({
        where: {
            address: newSpot.address,
            city: newSpot.city,
            state: newSpot.state,
            country: newSpot.country,
            lat: newSpot.lat,
            lng: newSpot.lng,
            name: newSpot.name,
            description: newSpot.description,
            price: newSpot.price,
        }
    })

    if( !isValidSpot.address &&
        !isValidSpot.city &&
        !isValidSpot.state &&
        !isValidSpot.country &&
        !isValidSpot.lat &&
        !isValidSpot.lng &&
        !isValidSpot.name &&
        !isValidSpot.description &&
        !isValidSpot.price
      ) {
        res.status(400).json({
        message: `Entry is required`,
        statusCode: 400,
        })
      }
    
    res.json(newSpot)

});


module.exports = router;
