'use strict';

module.exports = () => ({
    async getAllUsersWithBrands() {
        return await strapi.entityService.findMany('api::user.user', {
            populate: ['brands'],
        });
    },
});
