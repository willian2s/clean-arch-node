const bcrypt = require('bcrypt')

class Encrypter {
  /**
   *
   * @param {string | Buffer} data
   * @param {string} encrypted
   * @returns {Promise<boolean>}
   */
  async compare (data, encrypted) {
    const isValid = await bcrypt.compare(data, encrypted)
    return isValid
  }
}

module.exports = Encrypter
