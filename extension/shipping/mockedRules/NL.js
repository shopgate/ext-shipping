/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async (context, input) => {
  if (!input.checkout.shippingAddress || input.checkout.shippingAddress.countryCode !== 'NL') {
    return {shippingMethods: input.shippingMethods}
  }

  // shipping rule for NL
  return {shippingMethods: input.shippingMethods.filter(shippingMethod => (
    shippingMethod.id === 'dhl' || shippingMethod.id === 'ups'
  ))}
}
