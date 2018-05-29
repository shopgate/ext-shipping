/**
 * @param {SDKContext} context
 * @param {ShippingMethodInput} input
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async (context, input) => {
  let selectedShippingMethod

  // the input might contain a selected shipping method, which takes priority, if it's valid
  if (input.checkout.shippingMethodId) {
    selectedShippingMethod = input.shippingMethods.find(
      method => method.id === input.checkout.shippingMethodId
    )
  }

  // if no shipping method selected in frontend, use the shipping method selection from user storage
  if (!selectedShippingMethod && context.meta.userId) {
    try {
      selectedShippingMethod = {
        id: await context.storage.user.get('lastShippingMethod')
      }
    } catch (err) {
      context.log.error(err, 'Failed to get last shipping method from user storage')
    }
  }

  // fill the shipping methods with selection data (no selection is also possible)
  return {shippingMethods: input.shippingMethods.map(method => {
    if (selectedShippingMethod && selectedShippingMethod.id === method.id) {
      return {...method, selected: true}
    }
    return {...method, selected: false}
  })}
}
