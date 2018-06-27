/**
 * @typedef {Object} GetTotalsInput
 * @property {ShippingMethod} shippingMethod
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

  if (!input.shippingMethod) {
    // no shipping methods
    return {totals}
  }

  const shippingMethod = input.shippingMethod

  if (shippingMethod.amount === 0) {
    return {totals}
  }

  totals.push({
    id: 'shipping',
    amount: shippingMethod.amount
  })

  return {
    totals
  }
}
