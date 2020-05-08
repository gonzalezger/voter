'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  roomId: Joi.string().required(),

  topic: Joi.string().required(),

  voteType: Joi.object().required(),

  adminCanVote: Joi.boolean().default(true)
});
