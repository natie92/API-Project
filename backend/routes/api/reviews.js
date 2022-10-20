const express = require("express");
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const sequelize = require("sequelize");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


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

//add and image to a Review based on Review id

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId


    const review = await Review.findByPk(reviewId);

    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }


    if (userId !== review.userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }

    const images = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    })

    if(images.length > 9){
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 404,
        })
    }

    const newImage = await ReviewImage.create({
        reviewId: reviewId,
        url: req.body.url,
    })

    const { id, url } = newImage;

    return res.json({ id, url})


});

//get all reviews from curr user

router.get('/current',requireAuth, async (req, res) => {
    const userId = req.user.id

    // console.log(userId)

    const userReviews = await Review.findAll({
        where: {
            userId: userId
        },

        include: [
            { model: User, attributes: ["id", "firstName", "lastName"]},
            { model: ReviewImage, attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId']} },
            { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt']}},
        ]


    })

    if(userReviews.length === 0){
        return res.status(404).json({
            message: " This user has no reviews",
            statusCode: 404,
        })
    }

    const userArr = [];
    userReviews.forEach((review) => {
        userArr.push(review.toJSON());
    })

    // console.log(userArr[0].ReviewImages.length)

    userArr.forEach((review) => {
        if(review.ReviewImages.length){
            review.Spot.previewImage = review.ReviewImages[0].url
        } else {
            review.Spot.previewImage = ""
        }


    })


    // const userReviews = await Review.findAll({
    //     where: {
    //         userId: userId
    //     },
    //      attributes: {
    //         include: [

    //             [ sequelize.col('SpotImages.url'),'previewImage'],
    //         ]
    //     },
    //     include: [
    //         { model: User, attributes: ["id", "firstName", "lastName"]},
    //         { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt']}},
    //         { model: SpotImage, attributes: []},
    //         { model: ReviewImage, attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId']} }
    //       ],
    //     });

        res.json({Reviews: userArr})

});

// edit a review


router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const { review, stars } = req.body;

    const editReview = await Review.findByPk(reviewId);

    if(!editReview){
         return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }

    editReview.update({ review, stars });
    res.json(editReview)

});

router.delete('/:reviewId', requireAuth, async (req, res ) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const reviewToDelete = await Review.findByPk(reviewId);

    if(!reviewToDelete){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }
    if (reviewToDelete.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
        });
    }
    reviewToDelete.destroy();
    res.json({ message: "Successfully deleted", statusCode: 200})


});












module.exports = router;
