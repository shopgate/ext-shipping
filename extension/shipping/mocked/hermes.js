/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethods>}
 */
module.exports = async (context, input) => {
  const methods = input.methods

  let allow = true

  // Return DHL when address is in DE
  if (input.shippingAddress && input.shippingAddress.countryCode) {
    const allowedCountries = ['DE']
    if (!allowedCountries.includes(input.shippingAddress.countryCode)) {
      allow = false
    }
  }

  if (allow) {
    methods.push({
      id: 'hermes',
      name: 'Hermes',
      description: 'Delivery of order before Sunday 18 May 2018',
      amount: 500
    })
  }

  return {methods}
}
