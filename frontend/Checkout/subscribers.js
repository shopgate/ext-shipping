import { main$ } from '@shopgate/pwa-common/streams/main';
import fetchShippingMethods from './action';
import { getCheckout } from './selectors';

export default (subscribe) => {
  const checkoutData$ = main$.filter(({ action }) => action.type === 'CHECKOUT_DATA');
  const selectShippingMethod$ = main$.filter(({ action }) => action.type === 'SELECT_SHIPPING_METHOD');

  subscribe(checkoutData$, ({ dispatch, getState, action }) => {
    if (action.id === 'shippingMethod') {
      return;
    }
    setTimeout(() => {
      const checkout = getCheckout(getState());
      fetchShippingMethods(checkout)(dispatch);
    }, 500);
  });

  subscribe(selectShippingMethod$, ({ dispatch, action }) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'shippingMethod',
      data: {
        id: action.method.id,
        name: action.method.name,
        amount: action.method.amount,
      },
    });
  });
};
