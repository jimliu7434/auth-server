const jwt = require('jsonwebtoken');
const secret = 'jwt1234567890';

const sign_options = {
    algorithm: 'HS256',
    expiresIn: 1200, // 20 minutes
};

const verify_options = {
    algorithm: 'HS256',
};

module.exports = {
    sign: async (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, sign_options, (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            });
        });
    },
    verify: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, verify_options, (error, decoded) => {
                if (error) {
                    reject(error);
                }
                resolve(decoded);
            });
        });
    },
    decode: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.decode(token, secret, verify_options, (error, decoded) => {
                if (error) {
                    reject(error);
                }
                resolve(decoded);
            });
        });
    }
}
