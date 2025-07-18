'use strict';

/**
 * faq router
 */

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
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/faqs/:id',
            handler: 'faq.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/faqs/:id',
            handler: 'faq.delete',
            config: {
                policies: [],
            },
        },
    ],
};
