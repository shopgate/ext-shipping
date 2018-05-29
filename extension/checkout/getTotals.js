/**
 * @typedef {Object} GetTotalsInput
 * @property {ShippingMethod[]} shippingMethods
 * @property {Object} checkout
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {GetTotalsInput} input
 * @returns {Promise<{totals: Object[]}>}
 */
module.exports = async (context, input) => {
  const totals = input.totals

  if (!input.shippingMethods.length || !input.checkout.shippingMethod) {
    // no shipping methods
    return {totals}
  }

  const shippingMethod = input.shippingMethods.find(method => method.id === input.checkout.shippingMethod.id)
  if (!shippingMethod) {
    context.log.info(input, 'Could not find shipping method to calculate totals')
    return {totals}
  }

  if (shippingMethod.amount === 0) {
    return {totals}
  }

  totals.push({
    id: 'shipping',
    label: 'Shipping',
    amount: shippingMethod.amount
  })

  return {
    totals
  }
}
