module.exports = async (ctx, next) => {
    const { id } = ctx.params;
    const user = ctx.state.user;

    if (!user) {
        return ctx.unauthorized("کاربر احراز هویت نشده است.");
    }

    try {
        // استخراج UID مدل مثل: api::article.article
        const apiUID = ctx.request.route.info.apiName;

        const entity = await strapi.entityService.findOne(apiUID, id, {
            populate: ['owner'], // یا هر اسمی که در مدل استفاده کردی
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
