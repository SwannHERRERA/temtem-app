const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWTkey, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { authenticateJWT }