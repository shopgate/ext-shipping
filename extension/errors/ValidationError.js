const ShippingError = require('./ShippingError')

class ValidationError extends ShippingError {
  constructor (error) {
    super()

    this.code = 'EINV'
    this.message = `Validation error ${error}`
    this.error = error
  }
}

module.exports = ValidationError
