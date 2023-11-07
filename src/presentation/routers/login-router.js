const {
  InvalidParamError,
  MissingParamError
} = require('../errors')
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
 * @property {(email: string, password: string) => string} AuthUseCase.auth
 *
 * @typedef {object} EmailValidator
 * @property {(email: string) => boolean} EmailValidator.isValid
 *
 */
class LoginRouter {
  /**
   *
   * @param {AuthUseCase} authUseCase
   * @param {EmailValidator} emailValidator
   */
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  /**
   *
   * @param {LoginRequest} httpRequest
   * @returns {LoginResponse}
   */
  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }

      return HttpResponse.ok({ accessToken })
    } catch (err) {
      console.error(err)
      return HttpResponse.internalServerError()
    }
  }
}

module.exports = LoginRouter
