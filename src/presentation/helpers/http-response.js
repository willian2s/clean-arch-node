const { InternalServerError, UnauthorizedError } = require('../errors')

/**
 *
 * @typedef {Object} ErrorResponse
 * @property {Error} ErrorResponse.body
 * @property {number} ErrorResponse.statusCode
 */
class HttpResponse {
  /**
   *
   * @param {Error} error
   * @returns {ErrorResponse}
   */
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  /**
   *
   * @returns {ErrorResponse}
   */
  static internalServerError () {
    return {
      statusCode: 500,
      body: new InternalServerError()
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
   * @param {Record<string, unknown>} data
   * @returns {ErrorResponse}
   */
  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }
}

module.exports = HttpResponse
