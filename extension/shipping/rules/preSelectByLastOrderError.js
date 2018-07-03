/**
 * @param {?Error} error
 * @param {SDKContext} context
 * @param {{shippingMethods: ShippingMethod[]}} input
 * @returns {Promise<{shippingMethods: ShippingMethod[]}>}
 */
module.exports = async (error, context, input) => {
  // If no error occurred or auth, do nothing
  if (!error || error.code === 'EACCESS') {
    return input
  }

  context.log.warn(error, 'Could not preselect shipping method by last order')
  return input
}
