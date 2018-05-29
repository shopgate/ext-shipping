/**
 * @param {Object} state redux
 * @return {*}
 */
export const getMethods = state => state.extensions['@shopgate/shipping/CheckoutReducers'].methods;
/**
 * @param {Object} state redux
 * @return {*}
 */
export const getCheckout = state => state.extensions['@shopgate/checkout/CheckoutReducers'].checkout;
