export default (state = {}, action) => {
  switch (action.type) {
    case 'SHIPPING_METHODS':
      return {
        ...state,
        methods: action.methods,
      };

    case 'SELECT_SHIPPING_METHOD':
      return {
        ...state,
        selectedMethod: action.method,
      };

    default:
      return {
        methods: [],
        selectedMethod: null,
        ...state,
      };
  }
};
