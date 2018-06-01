/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async (context, input) => {
  input.shippingMethods.push({
    id: 'hermes',
    name: 'Hermes',
    description: 'Delivery of order before Sunday 18 May 2018',
    amount: 6.2,
    taxAmount: 1.05
  })

  return {shippingMethods: input.shippingMethods}
}
