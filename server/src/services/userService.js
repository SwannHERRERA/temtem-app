const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = process.env;

async function authenticate({ email, password }) {
  const user = await User.findOne({
    email: email.toString(),
  });
  if (!user) throw new Error('Username or password is incorrect');

  User.verify(email, password)

  const token = jwt.sign({ sub: user.id }, config.JWTkey, { expiresIn: '7d' });
  
  return {
    user,
    token,
  };
}


module.exports = {
  authenticate,
};
