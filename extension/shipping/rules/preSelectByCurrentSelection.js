/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<{shippingMethods: Object[]}>}
 */
module.exports = async (context, input) => {
  if (!input.checkout.shippingMethod) {
    return {
      shippingMethods: input.shippingMethods.map(method => ({
        ...method,
        selected: false
      }))
    }
  }

  const shippingMethods = input.shippingMethods.map(method => ({
    ...method,
    selected: input.checkout.shippingMethod.id === method.id
  }))

  return {shippingMethods}
}
