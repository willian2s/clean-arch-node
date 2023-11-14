class Bcrypt {
  isValid = true
  data = null
  encrypted = null

  /**
   *
   * @param {string | Buffer} data
   * @param {string} encrypted
   * @returns {Promise<boolean>}
   */
  async compare (data, encrypted) {
    this.data = data
    this.encrypted = encrypted
    return this.isValid
  }
}

module.exports = new Bcrypt()
