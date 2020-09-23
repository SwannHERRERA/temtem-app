const config = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function authenticate({ email, password }) {
  const user = User.findOne({
    email: email.toString(),
  });
  if (!user || !User.verify(email, password)) throw new Error('Username or password is incorrect');

  const token = jwt.sign({ sub: user.id }, config.JWTkey, { expiresIn: '7d' });
  
  return {
    user,
    token,
  };
}
function register(body) {
  
}


module.exports = {
  authenticate,
  register,
};
