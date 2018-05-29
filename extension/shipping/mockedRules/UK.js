/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async (context, input) => {
  if (input.checkout.shippingAddress && input.checkout.shippingAddress.countryCode !== 'UK') {
    return {shippingMethods: input.shippingMethods}
  }

  // no shipping methods for UK
  return {shippingMethods: []}
}
