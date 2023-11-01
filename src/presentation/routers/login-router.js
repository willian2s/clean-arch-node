const HttpResponse = require('../helpers/http-response')

/**
 *
 * @typedef {Object} LoginRequest
 * @property {object} LoginRequest.body
 * @property {string} LoginRequest.body.email
 * @property {string} LoginRequest.body.password
 */
class LoginRouter {
  /**

   *
   * @param {LoginRequest} httpRequest
   * @returns {object}
   */
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.internalServerError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

module.exports = LoginRouter
