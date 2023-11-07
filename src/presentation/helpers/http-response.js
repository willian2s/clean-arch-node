import MissingParamError from './missing-param-error'
import UnauthorizedError from './unauthorized-error'

/**
 *
 * @typedef {Object} ErrorResponse
 * @property {Error} ErrorResponse.body
 * @property {number} ErrorResponse.statusCode
 */
class HttpResponse {
  /**
   *
   * @param {string} paramName
   * @returns {ErrorResponse}
   */
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  /**
   *
   * @returns {ErrorResponse}
   */
  static internalServerError () {
    return {
      statusCode: 500
    }
  }

  /**
   *
   * @returns {ErrorResponse}
   */
  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  /**
   *
   * @returns {ErrorResponse}
   */
  static ok () {
    return {
      statusCode: 200
    }
  }
}

export default HttpResponse
