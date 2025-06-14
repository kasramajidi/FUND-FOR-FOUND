'use strict';

/**
 * about-brand router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/about-brands',
            handler: 'about-brand.find',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/about-brands/:id',
            handler: 'about-brand.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/about-brands',
            handler: 'about-brand.create',
            config: {
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/about-brands/:id',
            handler: 'about-brand.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/about-brands/:id',
            handler: 'about-brand.delete',
            config: {
                policies: [],
            },
        },
    ],
};
