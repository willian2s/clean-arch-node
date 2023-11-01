const HttpResponse = require('../helpers/http-response')

/**
 *
 * @typedef {object} LoginRequest
 * @property {object} LoginRequest.body
 * @property {string} LoginRequest.body.email
 * @property {string} LoginRequest.body.password
 *
 * @typedef {object} LoginResponse
 * @property {object} LoginResponse.body
 * @property {number} LoginResponse.statusCode
 *
 * @typedef {object} AuthUseCase
 * @property {(email: string) => void} AuthUseCase.auth
 *
 * @typedef {object} Dependecies
 * @property {AuthUseCase} Dependecies.authUseCase
 */
class LoginRouter {
  /**
   *
   * @param {Dependecies} dependecies
   */
  constructor ({ authUseCase }) {
    this.authUseCase = authUseCase
  }

  /**
   *
   * @param {LoginRequest} httpRequest
   * @returns {LoginResponse}
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

    this.authUseCase.auth(email, password)
    return HttpResponse.unauthorizedError()
  }
}

module.exports = LoginRouter
