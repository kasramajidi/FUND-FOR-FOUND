'use strict';

/**
 * register service
 */

const crypto = require('crypto');

module.exports = {
    createToken: () => {
        return crypto.randomBytes(32).toString('hex');
    }
};
