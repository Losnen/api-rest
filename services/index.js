const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/secret');

function createToken (user) {
  const payload = {
    sub: user._id,
    iat moment().unix(),
    esp moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = createToken;
