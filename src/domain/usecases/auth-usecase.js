const { MissingParamError } = require('../../utils/errors')

/**
 *
 * @typedef {object} LoadUserByEmailRepository
 * @property {(email: string) => Promise<Record<string, unknown>>} LoadUserByEmailRepository.load
 *
 * @typedef {object} Encrypter
 * @property {(password: string, hashedPassword: string) => Promise<string>} Encrypter.compare
 * @typedef {object} TokenGenerator
 * @property {(userId: string) => Promise<any>} TokenGenerator.generate
 *
 */
class AuthUseCase {
  /**
   *
   * @param {LoadUserByEmailRepository} loadUserByEmailRepository
   * @param {Encrypter} encrypter
   * @param {TokenGenerator} tokenGenerator
   */
  constructor (loadUserByEmailRepository, encrypter, tokenGenerator) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
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
    const isValid = user && await this.encrypter.compare(password, user.password)
    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user.id)

      return accessToken
    }

    return null
  }
}

module.exports = AuthUseCase
