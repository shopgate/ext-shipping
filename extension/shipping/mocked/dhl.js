/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethods>}
 */
module.exports = async (context, input) => {
  const methods = input.methods

  let allow = true

  // Return DHL when address is in DE, NL
  if (input.checkout.shippingAddress && input.checkout.shippingAddress.countryCode) {
    const allowedCountries = ['DE', 'NL']
    if (!allowedCountries.includes(input.checkout.shippingAddress.countryCode)) {
      allow = false
    }
  }

  if (allow) {
    methods.push({
      id: 'dhl',
      name: 'DHL',
      description: 'Delivery of order before Saturday 17 May 2018',
      amount: 90
    })
  }

  return {methods}
}
