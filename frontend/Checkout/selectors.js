const key = '@shopgate/shipping/CheckoutReducers';
/**
 * @param {Object} state redux
 * @return {*}
 */
export const getMethods = state => state.extensions[key].methods;

/**
 * @param {Object} state state
 * @return {*}
 */
export const getSelectedMethod = (state) => {
  const methods = getMethods(state);
  if (!methods) {
    return false;
  }
  return methods.find(method => method.selected);
};

/**
 * @param {Object} state redux
 * @return {*}
 */
export const getContext = state => state.extensions[key].context;
