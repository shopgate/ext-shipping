/**
 * @typedef {Object} SDKContext
 * @property {ExtensionConfig} config
 * @property {SDKContextMeta} meta
 * @property {SDKContextStorage} storage
 * @property {SDKContextLog} log
 * @property {function} tracedRequest
 */

/**
 * @typedef {Object} ExtensionConfig
 */

/**
 * @typedef {Object} SDKContextMeta
 * @property {string} deviceId
 * @property {string} appId
 * @property {string} userId
 * @property {string} appLanguage
 */

/**
 * @typedef {Object} SDKContextStorage
 * @property {SDKContextEntityStorage} extension
 * @property {SDKContextEntityStorage} device
 * @property {SDKContextEntityStorage} user
 */

/**
 * @typedef {Object} SDKContextEntityStorage
 * @property {function} get - (string key, function cb)
 * @property {function} set - (string key, mixed value, function cb)
 * @property {function} del - (string key, function cb)
 */

/**
 * @typedef {Object} SDKContextLog
 * @property {function} trace
 * @property {function} debug
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} fatal
 */

/**
 * @typedef {Object} ShippingMethod
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} amount - minor units
 * @property {?boolean} selected
 */

/**
 * @typedef {Object} GetShippingMethodsInput
 * @property {Checkout} checkout
 */

/**
 * @typedef {Object} ShippingMethodInput
 * @property {Checkout} checkout
 * @property {ShippingMethod[]} shippingMethods
 */

/**
 * typedef {Object} Checkout
 * @property {?Object[]} items
 * @property {?Object} shippingAddress
 * @property {string} shippingAddress.
 * @property {?Object} billingAddress
 * @property {?string} shippingMethodId
 * @property {?string} paymentMethodId
 */
