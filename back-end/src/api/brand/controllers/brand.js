'use strict';

/**
 * brand controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = {
    async find(ctx) {
        const brands = await strapi.entityService.findMany('api::brand.brand', {
            ...ctx.query,
            populate: ['tires', 'user', 'authUser', 'cover', 'pictureProfile']
        });
        return brands;
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        const brand = await strapi.entityService.findOne('api::brand.brand', id, {
            ...ctx.query,
            populate: ['tires', 'user', 'authUser', 'cover', 'pictureProfile']
        });
        return brand;
    },
    async update(ctx) {
        const { id } = ctx.params;
        return await strapi.entityService.update('api::brand.brand', id, {
            data: ctx.request.body.data,
        });
    },
    async delete(ctx) {
        const { id } = ctx.params;
        return await strapi.entityService.delete('api::brand.brand', id);
    },
    async create(ctx) {
        return await strapi.entityService.create('api::brand.brand', {
            data: ctx.request.body.data,
        });
    },
};
