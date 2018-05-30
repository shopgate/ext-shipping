import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';

export default checkout => (dispatch) => {
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
