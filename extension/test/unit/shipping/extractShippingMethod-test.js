const assert = require('assert')
const executeStep = require('../../../shipping/extractShippingMethod')

describe('extractShippingMethod', () => {
  const mockedMethod1 = {
    id: 'dhl',
    name: 'DHL',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 90,
    selected: true
  }

  const mockedMethod2 = {
    id: 'ups',
    name: 'UPS',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 100,
    selected: false
  }

  const mockedMethod3 = {
    id: 'hermes',
    name: 'Hermes',
    description: 'Delivery of order before Sunday 18 May 2018',
    amount: 110,
    selected: false
  }

  it('Should fetch the correct shipping method regardless, of what is selected', async () => {
    const input = {
      checkout: {
        shippingMethodId: mockedMethod2.id
      },
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {
      shippingMethod: mockedMethod2
    }

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })

  it('Should not get any payment method, if the input does not contain a shippingMethodId in the checkout', async () => {
    // no fronteend selection given, so it should take it from the last order
    const input = {
      checkout: {},
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {shippingMethod: undefined}

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })

  it('Should not return any shipping methods, if the requested shipping method is not in the list', async () => {
    // select 1 and 2, but 2 should be prioritized over 1
    const input = {
      checkout: {
        shippingMethodId: mockedMethod3.id
      },
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {shippingMethod: undefined}

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })

  it('Should not select any shipping if the selection is not available', async () => {
    // set mocked shipping methods 1 and 2 to "selected"
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        shippingMethodId: mockedMethod2.id
      },
      // shipping methods 1 and 2 are not selectable
      shippingMethods: [
        mockedMethod3
      ]
    }

    // mocked shipping methods 1 and 2 were selected but only not-selected method 3 is expected
    const expectedOutput = {
      shippingMethods: [
        {...mockedMethod3, selected: false}
      ]
    }

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })
})
