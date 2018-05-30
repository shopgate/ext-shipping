class ShippingError extends Error {
  constructor (cause = {message: ''}) {
    super()

    this.cause = cause
    this.code = 'ESHIPPING'
    this.message = `Shipping error: ${cause.message}`
  }
}

module.exports = ShippingError
