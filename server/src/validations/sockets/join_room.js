'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  roomId: Joi.string().required(),

  username: Joi.string().required(),

  isAdmin: Joi.boolean().default(false),

  isCreating: Joi.boolean().default(false)
});
