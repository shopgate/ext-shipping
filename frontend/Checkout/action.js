import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';

export default checkout => (dispatch) => {
  dispatch({ type: 'FETCH_SHIPPING_METHODS' });

  new PipelineRequest('shopgate.checkout.getShippingMethods')
    .setInput({ checkout })
    .dispatch()
    .then(({ shippingMethods }) => {
      dispatch({
        type: 'SHIPPING_METHODS',
        methods: shippingMethods,
      });
    });
};
