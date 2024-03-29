const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/secret');

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        esp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                reject({status: 401, message: 'El token ha expirado'});
            }

            resolve(payload.sub);

        } catch (err) {
            reject({status: 500, message: 'Invalid token'})
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};
