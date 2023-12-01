/**
 * Includes all the endpoints in the api.
 * @example { home: '/', ditto: '/ditto', ... }
 */
const urls = {
  home: '/',
  ditto: '/ditto',
  pokemon: '/pokemon',
}

/**
 * Gets a url with params.
 * @endpoint
 * @params
 * @returns {string} url with params.
 * @example endpointWithParams('endpoint/{{id}}', { id: 123 }) // endpoint/123
 */
const endpointWithParams = (endpoint: String, params: any) => {
  let url = endpoint
  Object.keys(params).forEach((p) => (url = url.replace(`{{${p}}}`, params[p])))
  return url
}

module.exports = {
  urls,
  endpointWithParams,
}
