'use strict';

/**
 * register router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/register',
            handler: 'register.register',
            config: {
                policies: [],
                auth: false
            }
        }
    ]
};
