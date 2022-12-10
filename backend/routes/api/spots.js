const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require("../../db/models");

const { Op } = require('sequelize');

const { check, query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage('Needs street address'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('Needs city'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Needs country'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('Needs State'),
    check('lat')
    .exists({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 80 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description must be entered"),
  check("price")
    .exists({ checkFalsy: true })
    .isInt({ checkFalsy: true })
    .withMessage("Price per night is needed"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),

  handleValidationErrors,
];


const validateBooking = [
  check("endDate").custom((endDate, { req }) => {
    if (req.body.startDate >= endDate) {
      throw new Error("EndDate cannot be on or before startDate");
    } else {
      return true;
    }
  }),
  handleValidationErrors,
];

// Get all spots

router.get('/', async (req, res, next) => {
    let airbnbspots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating',

                ],
                [ sequelize.col('SpotImages.url'),'previewImage'],
            ]
        },
        group: ['Spot.id', 'SpotImages.url'],
        include: [
            { model: SpotImage, attributes: []},
            { model: Review , attributes: []},
        ]
    })

    res.json({
        Spots: airbnbspots
    })
});

// get all spots owned from curr user

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const userSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating',
                ],
                [ sequelize.col('SpotImages.url'),'previewImage'],
            ]
        },
        group: ['Spot.id', 'SpotImages.url'],
        include: [
            { model: SpotImage, attributes: []},
            { model: Review, attributes: []}
        ]

    });


    return res.json({
        Spots: userSpots})
});

//get details of spot from an id

router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;
    const noSpot = await Spot.findByPk(id);

    if (!noSpot) {
         return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }
    const currentSpot = await Spot.findByPk(id, {
        attributes: {
            include: [
                [
                    sequelize.fn('COUNT', sequelize.col('Reviews.review')),
                    'numReviews',
                ],
                [ sequelize.fn('AVG', sequelize.col('Reviews.stars')),'avgStarRating'],
            ]
        },
        group: ['Reviews.review', 'Reviews.stars', 'Spot.id', 'Owner.id', 'SpotImages.id'],
        include: [
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
            { model: SpotImage, attributes: ['id', 'url','preview']},
            { model: Review, attributes: []}

        ],
        exclude: [
            { model: Spot, attributes: []}
        ]
    })

    res.json(currentSpot);
});


// create a spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id)
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    // console.log(user);
    // console.log(id);

    // if(!address || !city || !state || !country){
    //       return  res.status(400).json({
    //         message: 'Validation Error',
    //         statuscode: 400,
    //         errors: {
    //             address: 'Street address is required',
    //             city: "City is required",
    //             state: "State is required",
    //             country: "Country is required",
    //             lat: "Latitude is not valid",
    //             lng: "Longitude is not valid",
    //             name: "Name must be less than 50 characters",
    //             description: "Description is required",
    //             price: "Price per day is required"
    //         }
    //     })

    // }
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

    //console.log(isValidSpot)

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

// Add an Image to a Spot basedon spotId

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
        const userId = req.user.id;
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      })
    // const err = new Error ("Spot couldn't be found");
    // err.message = "Spot couldn't be found"
    // err.status = 404
    // return next(err)
    }
    if (userId !== spot.ownerId) {
        return res.status(404).json({
            message: "Forbidden",
            statusCode: 403,
        })
    }
    const image = await SpotImage.create({ spotId, userId, url: req.body.url, preview: req.body.preview});
    const { id, url, preview} = image
    res.json({id, url, preview});

});

//edit a spot

router.put('/:spotId', requireAuth, validateSpot, async(req, res, next) => {
    const spotId = req.params.spotId;
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    const spot = await Spot.findByPk(spotId, {

    });

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }

    // if (req.user.id !== spot.ownerId){
    //      return  res.status(400).json({
    //         message: 'Validation Error',
    //         statuscode: 400,
    //         errors: {
    //             address: 'Street address is required',
    //             city: "City is required",
    //             state: "State is required",
    //             country: "Country is required",
    //             lat: "Latitude is not valid",
    //             lng: "Longitude is not valid",
    //             name: "Name must be less than 50 characters",
    //             description: "Description is required",
    //             price: "Price per day is required"
    //         }
    //     })
    // }
    spot.update({
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
    res.json(spot)

});

// create a review for a spot based on the spot's id

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    const spotIdNum = Number(spotId)

    // console.log(typeof(spotIdNum))

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    const checkReview = await Review.findOne({
        where: {
            userId, spotId
        },
        exclude: [
            { model: Spot, attributes: ['createdAt', 'updatedAt']}
        ]
    })



    if(checkReview){
        return res.status(403).json({
            message: 'User already has a review for this spot',
            statusCode: 403,
        })
    }

    const newReview = await Review.create({
        userId,
        spotId: spotId,
        review,
        stars,
    })

      console.log(" ++++++++ " + typeof newReview.spotId)
    res.json(newReview)


});

//get all reviews by Spot's id

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const isValidSpot = await Spot.findByPk(spotId);

    if(!isValidSpot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    const allReviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName']},
            { model: ReviewImage, attributes: [ 'id', 'url']}

        ],
    })
    res.json({ Reviews: allReviews})

});




//delete a spot
router.delete('/:spotId',requireAuth, async (req,res,next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }
    if(userId !== spot.ownerId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode:403,
        })
    }
    await spot.destroy();
    res.json({
        message: 'Successfully deleted',
        statusCode: 200,
    })

});

// create a booking from a spot based on the spot's id

router.post('/:spotId/bookings', requireAuth, restoreUser, validateBooking, async (req, res) => {
    const { startDate, endDate } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot){
        return res.status(400).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }
    if(userId == spot.ownerId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
        })
    }

    const bookedStartDate = await Booking.findOne({
        where: {
            spotId,
            endDate,
        }
    })

    const bookedEndDate = await Booking.findOne({
        where: {
            spotId,
            endDate,
        }
    })

    if(bookedStartDate || bookedEndDate) {
           return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
        })
    }

    if(bookedStartDate) {

    }

});

module.exports = router;
