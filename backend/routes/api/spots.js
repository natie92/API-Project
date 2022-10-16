const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require("../../db/models");

const { Op } = require('sequelize');

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
    });


    //console.log(spots)

    res.json(spots)
});

// get all spots owned from curr user

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

//get details of spot from an id

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


// create a spot
router.post('/', requireAuth, async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id)
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    // console.log(user);
    // console.log(id);

    if(!address || !city || !state || !country){
          return  res.status(400).json({
            message: 'Validation Error',
            statuscode: 400,
            errors: {
                address: 'Street address is required',
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })

    }
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
    });



    const isValidSpot = await Spot.findAll({
        where: {
            address: newSpot.address
        }
    });

    console.log(isValidSpot)

    if(isValidSpot.address === newSpot.address &&
        isValidSpot.city === newSpot.city &&
        isValidSpot.state === newSpot.state) {
            res.status(403).json({
                message: 'Address already exists',
                statusCode: 403
            })
        } else {
            res.status(201).json(newSpot)
        }

});


module.exports = router;
