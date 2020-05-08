'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  roomId: Joi.string().required(),

  user: Joi.string().required(),

  value: [Joi.string().required(), Joi.number().required()]
});
