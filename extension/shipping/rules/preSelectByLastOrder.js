/**
 * @param {SDKContext} context
 * @param {{shippingMethods: ShippingMethod[], orders: Object[], checkout: Checkout}} input
 * @returns {Promise<>}
 */
module.exports = async (context, input) => {
  // Keep current selection if valid
  const current = input.shippingMethods.find(m => input.checkout.shippingMethod && m.id === input.checkout.shippingMethod.id)
  if (current) {
    return {shippingMethods: input.shippingMethods}
  }

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
