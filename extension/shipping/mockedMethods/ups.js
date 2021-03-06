/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async (context, input) => {
  input.shippingMethods.push({
    id: 'ups',
    name: 'UPS next day delivery',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 7.3,
    taxAmount: 1.5
  })

  return {shippingMethods: input.shippingMethods}
}
