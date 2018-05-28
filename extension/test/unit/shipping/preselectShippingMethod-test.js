const assert = require('assert')
const executeStep = require('../../../shipping/preselectShippingMethod')

describe('preselectShippingMethod', () => {
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

  const context = {
    storage: {
      user: {
        get: () => null
      }
    }
  }

  it('Shipping methods should be not selected from the start', async () => {
    const input = {
      methods: [
        mockedMethod1,
        mockedMethod2
      ]
    }
    const expectedOutput = {
      methods: [
        {selected: false, ...mockedMethod1},
        {selected: false, ...mockedMethod2}
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

  it('Preselected shipping method should be returned as selected', async () => {
    context.storage.user.get = () => 'dhl'

    const input = {
      methods: [
        mockedMethod1,
        mockedMethod2
      ]
    }
    const expectedOutput = {
      methods: [
        {selected: true, ...mockedMethod1}, // dhl is preselected
        {selected: false, ...mockedMethod2}
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
