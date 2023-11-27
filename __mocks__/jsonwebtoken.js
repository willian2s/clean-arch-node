class Jsonwebtoken {
  id = null
  token = 'any_token'
  secret = null

  /**
   *
   * @param {string | object | Buffer} id
   * @param {import('jsonwebtoken').Secret} secret
   * @param {import('jsonwebtoken').SignOptions} options
   * @returns {string}
   */
  sign (id, secret, options) {
    this.id = id
    this.secret = secret

    return this.token
  }
}

module.exports = new Jsonwebtoken()
