
const userService = require('../services/userService');
const { User } = require('../models/');
const {
  createError,
  CONFLICT
} = require('../helpers/error_helper')

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function register(req, res, next) {
  const body = req.body;
  User.findOne({ email: body.email })
    .then(user => {
      if (user) {
        return next(createError({
          status: CONFLICT,
          message: 'Username already exists'
        }))
      }
      res.json(User.create(body));
    })

}

module.exports = { authenticate, register };
