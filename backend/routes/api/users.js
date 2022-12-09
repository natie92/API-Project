const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


router.post('/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const isValidEmail = await User.findOne({
      where: {
        email: email
      }
    });
    if(isValidEmail){
      const err = new Error('User already exists');
      err.status = 403;
      err.errors = {email: "User with that email already exists"};
      return next(err)
      // return res.status(403).json({
      //   message: 'User already exists',
      //   statusCode: 403,
      //   errors: {
      //     email: 'User with that email already exists'
      //   }
      // })
    };

    const isUserNameValid = await User.findOne({
      where: {
        username: username
      }
    })
    if(isUserNameValid){
      return res.status(403).json({
        message: 'User already exists',
        statusCode: 403,
        errors: {
          email: 'User with that username already exists'
        }
      })
    }

    const user = await User.signup({
      firstName,
      lastName,
      email,
      username,
      password
    })

    user.dataValues.token = await setTokenCookie(res,user);
    return res.json(user);

//     if(!firstName || !lastName || !email || !username){
//       return res.status(400).json({
//         message: 'Validation Error',
//         statusCode: 400,
//         errors: {
//           email: 'Invalid Email',
//           username: 'Username is required',
//           firstName: 'First Name is required',
//           lastName: 'Last Name is required'
//         }
//       })
//     }
});



module.exports = router;
