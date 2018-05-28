/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<undefined>}
 */
module.exports = async (context, input) => {
  if (!input.checkout.shippingMethod) {
    // there was no selection. do nothing
    return
  }

  try {
    await context.storage.user.set('lastShippingMethod', input.checkout.shippingMethod.id)
  } catch (err) {
    context.log.error(err, 'Failed to save last shipping method to user storage')
  }
}
