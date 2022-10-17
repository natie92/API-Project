const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log(validationErrors)
    const errObj = {};
    const errors = validationErrors
      .array()
      // .map((error) => `${error.msg}`);
      .forEach((error) => errObj[error.param] = error.msg)

    const err = Error('Validation Error');
    err.errors = errObj;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};


module.exports = { handleValidationErrors };
