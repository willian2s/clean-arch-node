import HttpResponse from '../helpers/http-response'

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
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.internalServerError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }

    const accessToken = this.authUseCase.auth(email, password)
    if (!accessToken) {
      return HttpResponse.unauthorizedError()
    }

    return HttpResponse.ok({ accessToken })
  }
}

export default LoginRouter
