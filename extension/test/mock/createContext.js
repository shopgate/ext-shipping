/**
 * Creates a full context object with the given handler functions, that are converted to asynchronous storage functions.
 *
 * @param {string} storageName
 * @param {function} storageGetHandler
 * @param {function} storageSetHandler
 * @param {function} storageDelHandler
 * @param {number} userId
 * @returns {SDKContext}
 */
module.exports = (storageName = 'user', storageGetHandler = () => {}, storageSetHandler = () => {}, storageDelHandler = () => {}, userId = null) => {
  function SDKContext () {}
  const context = new SDKContext()
  context.storage = {}
  context.meta = {}
  context.meta.userId = userId
  context.log = {}
  context.log.info = () => {}
  context.log.error = () => {}
  context.log.warn = () => {}
  context.log.debug = () => {}
  context.storage[storageName] = {
    get: async (key) => storageGetHandler(key),
    set: async (key, data) => storageSetHandler(key, data),
    del: async (key) => storageDelHandler(key)
  }

  const unusedStorage = storageName === 'user' ? 'device' : 'user'
  context.storage[unusedStorage] = {
    get: async () => null,
    set: async () => null,
    del: async () => null
  }

  return context
}
