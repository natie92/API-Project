const express = require("express");
const { Spot, SpotImage, User } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();



router.delete('/:imageId',requireAuth, async (req,res,next) => {
    const id = req.params.imageId;
    const userId = req.user.id;
    const image = await SpotImage.findOne({
        where: { id },
        include: [
            { model: Spot, attributes: ['ownerId']},
        ]
    });

    if(!image){
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404,
        })
    }
    if(userId !== image.Spot.ownerId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
        })
    }
    image.destroy();
    res.json({
        message: 'Successfully deleted',
        statusCode: 200,
    });

});



module.exports = router;
