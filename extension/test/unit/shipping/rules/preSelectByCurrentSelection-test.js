const assert = require('assert')
const executeStep = require('../../../../shipping/rules/preSelectByCurrentSelection')
const createContext = require('../../../mock/createContext')

describe('preSelectByCurrentSelection', () => {
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

  const mockedMethod3 = {
    id: 'hermes',
    name: 'Hermes',
    description: 'Delivery of order before Saturday 17 May 2018',
    amount: 110
  }

  it('Should not select anything if no selection given', async () => {
    const context = createContext('user', () => null, () => {}, () => {}, 1)
    const input = {
      checkout: {},
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ],
      orders: []
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

  it('Should not select anything if out of selection range', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        shippingMethod: {
          id: mockedMethod3.id
        }
      },
      shippingMethods: [
        mockedMethod1,
        mockedMethod2
      ],
      orders: [
        {
          shippingMethod: {
            id: mockedMethod1.id
          }
        }
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

  it('Should keep the selection, if a valid one was given', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        shippingMethod: {
          id: mockedMethod2.id
        }
      },
      shippingMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: true}
      ],
      orders: [
        {
          shippingMethod: {
            id: mockedMethod1.id
          }
        }
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

  it('Should overwrite the current selection if any other preselection was set', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        shippingMethod: {
          id: mockedMethod1.id
        }
      },
      shippingMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: true}
      ],
      orders: [
        {
          shippingMethod: {
            id: mockedMethod1.id
          }
        }
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
