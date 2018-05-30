const Joi = require('joi')
const ValidationError = require('./../common/Error/ValidationError')
const ShippingError = require('./../common/Error/ShippingError')
const {checkoutSchema} = require('./jsonSchema')

/**
 * @typedef {Object} ValidateCheckoutInput
 * @property {Object} checkout
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {ValidateCheckoutInput} input
 * @return {Promise<undefined>}
 */
module.exports = async (context, input) => {
  if (!Array.isArray(input.totals)) {
    context.log.warn(input, 'Checkout totals is malformed')
    throw new ShippingError('Checkout totals is malformed')
  }

  let validationResult = Joi.validate(input.checkout, checkoutSchema)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }
}
