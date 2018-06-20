const assert = require('assert')
const executeStep = require('../../../../shipping/rules/preSelectByLastOrder')
const createContext = require('../../../mock/createContext')

describe('preSelectByLastOrder', () => {
  const mockedMethod1 = {
    id: 'dhl',
    name: 'DHL',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 90
  }

  const mockedMethod2 = {
    id: 'ups',
    name: 'UPS',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 100
  }

  it('Should not select anything if no last order is available', async () => {
    const context = createContext('user', () => null, () => {}, () => {}, 1)
    const input = {
      orders: [],
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

  it('Should select shipping method by order', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      orders: [
        {
          shippingMethod: {
            id: mockedMethod1.id
          }
        }
      ],
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
})
