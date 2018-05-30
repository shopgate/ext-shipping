import { main$ } from '@shopgate/pwa-common/streams/main';
import fetchShippingMethods from './action';

export default (subscribe) => {
  const checkoutData$ = main$.filter(({ action }) => action.type === 'CHECKOUT_DATA');
  const shippingMethods$ = main$.filter(({ action }) => action.type === 'SHIPPING_METHODS');
  const selectShippingMethod$ = main$.filter(({ action }) => action.type === 'SELECT_SHIPPING_METHOD');

  subscribe(checkoutData$, ({ dispatch, getState, action }) => {
    if (action.id === 'shippingMethod') {
      return;
    }
    setTimeout(() => {
      const { checkout } = getState().extensions['@shopgate/checkout/CheckoutReducers'];
      fetchShippingMethods(checkout)(dispatch);
    }, 500);
  });

  /**
   * After receiving shipping methods,
   * notify subscribers that we have default selection
   */
  subscribe(shippingMethods$, ({ dispatch, action }) => {
    // Find the first selected method
    const method = action.methods.find(meth => meth.selected);
    if (method) {
      dispatch({
        type: 'SELECT_SHIPPING_METHOD',
        method,
      });
    }
  });

  subscribe(selectShippingMethod$, ({ dispatch, action }) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'shippingMethod',
      data: {
        id: action.method.id,
      },
    });
  });
};
