const CheckoutError = require('./CheckoutError')

class ValidationError extends CheckoutError {
  constructor (error) {
    super()

    this.code = 'EVALIDATION'
    this.message = `Validation error ${error}`
    this.error = error
    this.validationErrors = []
  }
}

module.exports = ValidationError
