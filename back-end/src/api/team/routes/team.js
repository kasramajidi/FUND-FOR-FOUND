'use strict';

/**
 * team router
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/teams',
            handler: 'team.find',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/teams/:id',
            handler: 'team.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/teams',
            handler: 'team.create',
            config: {
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/teams/:id',
            handler: 'team.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/teams/:id',
            handler: 'team.delete',
            config: {
                policies: [],
            },
        },
    ],
};
