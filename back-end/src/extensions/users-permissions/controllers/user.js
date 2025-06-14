// ./src/api/user/controllers/user.js
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { id: id },
      populate: {
        brands: true, // assuming the relation is called 'brands' in the Brand model
      },
    });

    if (!user) {
      return ctx.notFound('User not found');
    }

    return user;
  },
}));
