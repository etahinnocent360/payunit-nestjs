import * as Joi from 'joi';
export const validationSchema = Joi.object({
  apiSecret: Joi.any(),
  apiUser: Joi.any(),
  apiKey: Joi.any(),
  Authorization: Joi.any(),
});
