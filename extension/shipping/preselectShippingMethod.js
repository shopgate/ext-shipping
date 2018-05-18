/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethods>}
 */
module.exports = async (context, input) => {
  let methods = input.methods

  let lastShippingMethod
  try {
    lastShippingMethod = await context.storage.user.get('lastShippingMethod')
  } catch (err) {
    context.log.error(err, 'Failed to get last shipping method from user storage')
  }

  methods = methods.map(method => {
    method.selected = !!lastShippingMethod && lastShippingMethod === method.id
    return method
  })

  return {methods}
}
