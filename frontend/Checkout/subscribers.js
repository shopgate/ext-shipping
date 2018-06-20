import { main$ } from '@shopgate/pwa-common/streams/main';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import fetchShippingMethods from './action';
import { getMethods } from './selectors';

export default (subscribe) => {
  const cartRouteDidEnter$ = routeDidEnter(CART_PATH);
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const shippingMethods$ = main$.filter(({ action }) => action.type === 'SHIPPING_METHODS');
  const selectShippingMethod$ = main$.filter(({ action }) => action.type === 'SELECT_SHIPPING_METHOD');

  /**
   * PreFetching of shipping methods on cart enter.
   */
  subscribe(cartRouteDidEnter$, ({ dispatch, getState }) => {
    const methods = getMethods(getState());
    if (!methods) {
      fetchShippingMethods()(dispatch);
    }
  });

  /**
   * Fetch shipping methods when checkout state is changed
   */
  subscribe(checkoutState$, ({ dispatch, action }) => {
    fetchShippingMethods(action.checkout)(dispatch);
  });

  /**
   * After receiving shipping methods,
   * notify subscribers that we have default selection
   */
  subscribe(shippingMethods$, ({ dispatch, action }) => {
    if (!Object.keys(action.checkout).length || action.checkout.shippingMethod) {
      // Prefetch before checkout or already selected for this checkout
      return;
    }

    // PreSelect first default method
    const method = action.methods.find(shipMethod => shipMethod.selected);
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
