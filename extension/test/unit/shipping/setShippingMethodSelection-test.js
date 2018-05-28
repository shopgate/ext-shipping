const assert = require('assert')
const executeStep = require('../../../shipping/setShippingMethodSelection')
const createContext = require('../../mock/createContext')

describe('setShippingMethodSelection', () => {
  const mockedMethod1 = {
    id: 'dhl',
    name: 'DHL',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 300
  }

  const mockedMethod2 = {
    id: 'ups',
    name: 'UPS',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 500
  }

  const mockedMethod3 = {
    id: 'hermes',
    name: 'Hermes',
    description: 'Delivery of order before Sunday 18 May 2018',
    amount: 500
  }

  it('Should not select anything if no data is available', async () => {
    const context = createContext('user', () => null, () => {}, () => {}, 1)

    const input = {
      checkout: {},
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {
      shippingMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: false}
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

  it('Should return last shipping method as selected, if nothing else available', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)

    const input = {
      checkout: {},
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {
      shippingMethods: [
        {...mockedMethod1, selected: true},
        {...mockedMethod2, selected: false}
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

  it('Should prioritize the shipping selection from frontend over the shipping from last order', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)

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
      shippingMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: true}
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

  it('Should not select any shipping if the selection is not available', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)

    const input = {
      checkout: {
        shippingMethodId: mockedMethod2.id
      },
      shippingMethods: [
        mockedMethod3
      ]
    }

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
