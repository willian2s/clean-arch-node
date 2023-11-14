const bcrypt = require('bcrypt')
const { MissingParamError } = require('../errors')

class Encrypter {
  /**
   *
   * @param {string | Buffer} data
   * @param {string} encrypted
   * @returns {Promise<boolean>}
   */
  async compare (data, encrypted) {
    if (!data) {
      throw new MissingParamError('data')
    }
    if (!encrypted) {
      throw new MissingParamError('encrypted')
    }
    const isValid = await bcrypt.compare(data, encrypted)
    return isValid
  }
}

module.exports = Encrypter
