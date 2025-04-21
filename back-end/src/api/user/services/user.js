'use strict';

module.exports = {
    async createOrUpdate({ data }) {
        const { email } = data;

        // Check if user exists
        const existingUser = await strapi.db.query('api::user.user').findOne({
            where: { email }
        });

        if (existingUser) {
            // Update existing user
            return await strapi.db.query('api::user.user').update({
                where: { id: existingUser.id },
                data
            });
        } else {
            // Create new user
            return await strapi.db.query('api::user.user').create({
                data
            });
        }
    },

    async updateByEmail(email, data) {
        return await strapi.db.query('api::user.user').update({
            where: { email },
            data
        });
    }
}; 