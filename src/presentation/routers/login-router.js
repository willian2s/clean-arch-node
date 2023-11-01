const HttpResponse = require('../helpers/http-response')

/**
 *
 * @typedef {object} LoginRequest
 * @property {object} LoginRequest.body
 * @property {string} LoginRequest.body.email
 * @property {string} LoginRequest.body.password
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

    this.authUseCase.auth(email, password)
  }
}

module.exports = LoginRouter
