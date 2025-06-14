'use strict';

/**
 * tire router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/tires',
            handler: 'tire.find',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/tires/:id',
            handler: 'tire.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/tires',
            handler: 'tire.create',
            config: {
                policies: ['is-owner'],
            },
        },
        {
            method: 'PUT',
            path: '/tires/:id',
            handler: 'tire.update',
            config: {
                policies: ['is-owner'],
            },
        },
        {
            method: 'DELETE',
            path: '/tires/:id',
            handler: 'tire.delete',
            config: {
                policies: ['is-owner'],
            },
        },
    ],
};
