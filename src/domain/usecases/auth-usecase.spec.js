const { MissingParamError } = require('../../utils/errors')

/**
 *
 * @typedef {object} LoadUserByEmailRepository
 * @property {(email: string) => Promise<any>} LoadUserByEmailRepository.load
 *
 */
class AuthUseCase {
  /**
   *
   * @param {LoadUserByEmailRepository} loadUserByEmailRepository
   */
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

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

    await this.loadUserByEmailRepository.load(email)
  }
}

const makeSut = () => {
  return new AuthUseCase()
}

describe('AuthUseCase', () => {
  test('Should throw with no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw with no password is provided', async () => {
    const sut = makeSut()
    const promise = sut.auth('any@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepositorySpy {
      email = null
      /**
       *
       * @param {string} email
       */
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
    await sut.auth('any@email.com', 'anyPassword')
    expect(loadUserByEmailRepositorySpy.email).toBe('any@email.com')
  })
})
