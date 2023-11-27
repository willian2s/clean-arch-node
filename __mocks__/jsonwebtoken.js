class Jsonwebtoken {
  token = 'any_token'

  /**
   *
   * @param {string | object | Buffer} id
   * @param {import('jsonwebtoken').Secret} secret
   * @param {import('jsonwebtoken').SignOptions} options
   * @returns {string}
   */
  sign (id, secret, options) {
    return this.token
  }
}

module.exports = new Jsonwebtoken()
