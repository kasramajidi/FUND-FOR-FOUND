module.exports = async (ctx, next) => {
    const { id } = ctx.params;
    const user = ctx.state.user;

    if (!user) {
        return ctx.unauthorized("کاربر احراز هویت نشده است.");
    }

    try {
        // Extract API UID from the route path
        const path = ctx.request.route.path;
        let apiUID;

        if (path.includes('/brands/')) {
            apiUID = 'api::brand.brand';
        } else if (path.includes('/teams/')) {
            apiUID = 'api::team.team';
        } else if (path.includes('/tires/')) {
            apiUID = 'api::tire.tire';
        } else if (path.includes('/faqs/')) {
            apiUID = 'api::faq.faq';
        } else if (path.includes('/about-brands/')) {
            apiUID = 'api::about-brand.about-brand';
        } else {
            // Fallback: try to extract from route info
            apiUID = ctx.request.route.info?.apiName || ctx.request.route.info?.api;
        }

        if (!apiUID) {
            console.error('Could not determine API UID for path:', path);
            return ctx.internalServerError("خطا در تعیین نوع محتوا.");
        }

        console.log('DEBUG: Checking ownership for', { apiUID, id, userId: user.id });

        const entity = await strapi.entityService.findOne(apiUID, id, {
            populate: ['owner'],
        });

        if (!entity) {
            return ctx.notFound("محتوا پیدا نشد.");
        }

        if (!entity.owner || entity.owner.id !== user.id) {
            return ctx.unauthorized("شما اجازه دسترسی به این محتوا را ندارید.");
        }

        return await next();
    } catch (error) {
        console.error('Error in is-owner policy:', error);
        return ctx.internalServerError("خطا در بررسی دسترسی.");
    }
};
