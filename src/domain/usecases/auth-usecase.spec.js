const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {string}
   */
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
  }
}

describe('AuthUseCase', () => {
  test('Should throw with no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw with no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
