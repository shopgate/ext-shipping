const Joi = require('joi')

// checkout schema
const checkoutSchema = Joi.object().keys({
  items: Joi.array().min(1).items(
    Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().valid(['product', 'coupon']).required(),
      unitPrice: Joi.number().integer(), // -100 | 0 | 100
      quantity: Joi.number().positive().integer().min(1) // 1 | 2 | ...
    })),
  shippingMethod: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required()
  })
}).requiredKeys([
  'items',
  'shippingMethod'
]).unknown(true) // other keys are allowed as well

module.exports = {
  checkoutSchema
}
