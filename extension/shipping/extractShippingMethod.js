/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod>|ShippingMethod}
 */
module.exports = async (context, input) => {
  let shippingMethod

  // the input might contain a selected shipping method, which takes priority, if it's valid
  if (input.checkout.shippingMethod) {
    shippingMethod = input.shippingMethods.find(
      method => method.id === input.checkout.shippingMethod.id
    )
  }

  // return found shipping method (or non if nothing available)
  return {shippingMethod}
}
