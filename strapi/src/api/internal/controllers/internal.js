'use strict';

/**
 * internal controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::internal.internal');
