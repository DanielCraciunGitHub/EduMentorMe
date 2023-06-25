'use strict';

/**
 * internal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::internal.internal');
