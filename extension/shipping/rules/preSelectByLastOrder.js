/**
 * @param {SDKContext} context
 * @param {{shippingMethods: ShippingMethod[], orders: Object[]}} input
 * @returns {Promise<>}
 */
module.exports = async (context, input) => {
  let lastMethodId

  if (Array.isArray(input.orders) && input.orders.length) {
    lastMethodId = input.orders[0].shippingMethod.id
  }

  const shippingMethods = input.shippingMethods.map(method => ({
    ...method,
    selected: lastMethodId === method.id
  }))

  return {
    shippingMethods
  }
}
