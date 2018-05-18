/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethods>}
 */
module.exports = async (context, input) => {
  const methods = input.methods

  // Return DHL when address is in DE, NL
  if (input.shippingAddress && input.shippingAddress.countryCode) {
    const allowedCountries = ['DE', 'NL']
    if (allowedCountries.contains(input.shippingAddress.countryCode)) {
      methods.push({
        id: 'ups',
        name: 'UPS next day delivery',
        description: 'Delivery of order before Saturday 17 May 2018',
        amount: 1000
      })
    }
  }

  return {methods}
}
