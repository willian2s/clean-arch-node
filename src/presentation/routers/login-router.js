import HttpResponse from '../helpers/http-response'
import MissingParamError from '../helpers/missing-param-error'

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
 */
class LoginRouter {
  /**
   *
   * @param {AuthUseCase} authUseCase
   */
  constructor (authUseCase) {
    this.authUseCase = authUseCase
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
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }

      return HttpResponse.ok({ accessToken })
    } catch (err) {
      return HttpResponse.internalServerError()
    }
  }
}

export default LoginRouter
