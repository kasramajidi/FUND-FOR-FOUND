'use strict';

/**
 * tire service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tire.tire');
