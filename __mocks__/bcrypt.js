class Bcrypt {
  isValid = true

  /**
   *
   * @param {string | Buffer} data
   * @param {string} encrypted
   * @returns {Promise<boolean>}
   */
  async compare (data, encrypted) {
    return this.isValid
  }
}

module.exports = new Bcrypt()
