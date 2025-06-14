'use strict';

/**
 * faq router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/faqs',
            handler: 'faq.find',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/faqs/:id',
            handler: 'faq.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/faqs',
            handler: 'faq.create',
            config: {
                policies: ['is-owner'],
            },
        },
        {
            method: 'PUT',
            path: '/faqs/:id',
            handler: 'faq.update',
            config: {
                policies: ['is-owner'],
            },
        },
        {
            method: 'DELETE',
            path: '/faqs/:id',
            handler: 'faq.delete',
            config: {
                policies: ['is-owner'],
            },
        },
    ],
};
