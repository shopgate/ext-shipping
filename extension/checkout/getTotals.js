/**
 * @typedef {Object} GetTotalsInput
 * @property {Object[]} totals
 * @property {Object} shippingMethod
 */

/**
 * @param {SDKContext} context
 * @param {GetTotalsInput} input
 * @returns {Promise<Object>}
 */
module.exports = async (context, input) => {
  const totals = input.totals

  if (input.shippingMethod) {
    totals.push({
      id: 'shipping',
      label: 'Shipping',
      amount: input.shippingMethod.amount
    })
  }

  return {
    totals
  }
}
