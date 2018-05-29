/**
 * Base step to prepare structure
 *
 * @returns {Promise<ShippingMethod[]>|ShippingMethod[]}
 */
module.exports = async () => {
  /** @type ShippingMethod[] */
  const shippingMethods = []
  return {shippingMethods}
}
