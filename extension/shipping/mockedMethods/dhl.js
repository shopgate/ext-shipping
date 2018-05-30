/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async (context, input) => {
  input.shippingMethods.push({
    id: 'dhl',
    name: 'DHL',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 90,
    taxAmount: 17
  })

  return {shippingMethods: input.shippingMethods}
}
