/**
 * @typedef {Object} RememberShippingMethodInput
 * @property {ShippingMethod} shippingMethod
 */

/**
 * @param {SDKContext} context
 * @param {RememberShippingMethodInput} input
 * @returns {Promise<undefined>}
 */
module.exports = async (context, input) => {
  if (!input.shippingMethod) {
    // there was no selection. do nothing
    return
  }

  try {
    await context.storage.user.set('lastShippingMethod', input.shippingMethod.id)
  } catch (err) {
    context.log.error(err, 'Failed to save last shipping method to user storage')
  }
}
