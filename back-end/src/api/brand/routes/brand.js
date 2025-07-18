'use strict';

/**
 * brand router
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/brands',
            handler: 'brand.find',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/brands/:id',
            handler: 'brand.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/brands',
            handler: 'brand.create',
            config: {
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/brands/:id',
            handler: 'brand.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/brands/:id',
            handler: 'brand.delete',
            config: {
                policies: [],
            },
        },
    ],
};
