const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// login User

router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if(!user){
    return res.status(401).json({
      message: 'Invalid credentials',
      statusCode: 401,
    })
  }

  user.dataValues.token = await setTokenCookie(res, user);

  return res.json(user);


});


// log out User

router.delete('/',(_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });

});

//get curr user

router.get('/',restoreUser, async (req, res) => {
    // const { user } = req;
    // const { token } = req.cookies
    // if (user) {
    //   return res.json({
    //     user: user.toSafeObject(),
    //     token
    //   });
    // } else return res.json({});
    const { user } = req;

    user.dataValues.token = await setTokenCookie(res, user)

    if(user){
      return res.json(user.dataValues)
    } else{
      return res.json(null)
    }

});

module.exports = router;
