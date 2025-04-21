'use strict';

const { isEmpty } = require('lodash/fp');

/**
 * register controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = {
    async register(ctx) {
        const { firstName, lastName, email, password } = ctx.request.body;

        // Validate required fields
        if (isEmpty(firstName)) {
            return ctx.badRequest('First name is required');
        }

        if (isEmpty(lastName)) {
            return ctx.badRequest('Last name is required');
        }

        if (isEmpty(email)) {
            return ctx.badRequest('Email is required');
        }

        // Check if email is already in use
        const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { email }
        });

        if (existingUser) {
            return ctx.badRequest('Email is already in use');
        }

        try {
            // Generate a token using the service
            const token = strapi.service('api::register.register').createToken();

            // Get the default role
            const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
            const settings = await pluginStore.get({ key: 'advanced' });

            // Default to 'authenticated' role if settings don't specify
            const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({
                where: { type: 'authenticated' }
            });

            if (!defaultRole) {
                return ctx.badRequest('Default role not found');
            }

            // Create a username from firstName and lastName
            const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

            // Create the user
            const user = await strapi.query('plugin::users-permissions.user').create({
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: password || Math.random().toString(36).substring(2, 15), // Random password if not provided
                    provider: 'local',
                    confirmed: true,
                    role: defaultRole.id
                }
            });

            // Get JWT token
            const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
                id: user.id
            });

            // Return user and token
            return ctx.send({
                jwt,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                token
            });
        } catch (error) {
            return ctx.badRequest(error.message);
        }
    }
};
