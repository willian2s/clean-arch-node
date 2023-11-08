const { MissingParamError } = require('../../utils/errors')

/**
 *
 * @typedef {object} LoadUserByEmailRepository
 * @property {(email: string) => Promise<Record<string, unknown>>} LoadUserByEmailRepository.load
 *
 * @typedef {object} Encrypter
 * @property {(password: string, hashedPassword: string) => Promise<string>} Encrypter.compare
 */
class AuthUseCase {
  /**
   *
   * @param {LoadUserByEmailRepository} loadUserByEmailRepository
   * @param {Encrypter} encrypter
   */
  constructor (loadUserByEmailRepository, encrypter) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      return null
    }
    const isValid = await this.encrypter.compare(password, user.password)
    if (!isValid) {
      return null
    }
  }
}

module.exports = AuthUseCase
