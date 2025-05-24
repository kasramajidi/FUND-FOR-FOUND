'use strict';

module.exports = {
    async findUsersWithBrands(ctx) {
        try {
            // Get users from both tables
            const authUsers = await strapi.db.query('plugin::users-permissions.user').findMany();
            const customUsers = await strapi.db.query('api::user.user').findMany({
                populate: ['brands']
            });

            // Get all brands
            const allBrands = await strapi.db.query('api::brand.brand').findMany();

            // Connect brands to auth users
            for (const authUser of authUsers) {
                const customUser = customUsers.find(u => u.email === authUser.email);
                if (customUser) {
                    // Get brands for this user
                    const userBrands = await strapi.db.query('api::brand.brand').findMany({
                        where: { user: customUser.id }
                    });

                    // Update each brand to include auth user
                    for (const brand of userBrands) {
                        await strapi.db.query('api::brand.brand').update({
                            where: { id: brand.id },
                            data: {
                                authUser: authUser.id
                            }
                        });
                    }
                }
            }

            // Get updated data
            const updatedAuthUsers = await strapi.db.query('plugin::users-permissions.user').findMany({
                populate: ['brands']
            });
            const updatedCustomUsers = await strapi.db.query('api::user.user').findMany({
                populate: ['brands']
            });

            // Format response
            const formattedResponse = {
                authUsers: updatedAuthUsers.map(user => ({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    provider: user.provider,
                    confirmed: user.confirmed,
                    blocked: user.blocked,
                    brands: user.brands?.map(brand => ({
                        id: brand.id,
                        brand: brand.brand,
                        category: brand.category,
                        country: brand.country
                    })) || []
                })),
                customUsers: updatedCustomUsers.map(user => ({
                    id: user.id,
                    email: user.email,
                    isVerified: user.isVerified,
                    brands: user.brands.map(brand => ({
                        id: brand.id,
                        brand: brand.brand,
                        category: brand.category,
                        country: brand.country
                    }))
                }))
            };

            ctx.send(formattedResponse);
        } catch (error) {
            console.error('Error:', error);
            ctx.throw(500, error);
        }
    },
};
