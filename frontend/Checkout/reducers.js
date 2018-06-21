export default (state = {}, action) => {
  switch (action.type) {
    case 'SHIPPING_METHODS':
      return {
        methods: action.methods,
        context: {
          paymentMethod: action.checkout.paymentMethod,
          shippingAddress: action.checkout.shippingAddress,
        },
      };

    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        methods: null,
        context: null,
      };

    default:
      return {
        methods: null,
        context: null,
        ...state,
      };
  }
};
