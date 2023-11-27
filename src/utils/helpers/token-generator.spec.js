const jwt = require('jsonwebtoken')

class TokenGenerator {
  secret = null

  /**
   *
   * @param {import('jsonwebtoken').Secret} secret
   */
  constructor (secret) {
    this.secret = secret
  }

  /**
   *
   * @param {string | object | Buffer} id
   * @returns {Promise<any>}
   */
  async generate (id) {
    return jwt.sign(id, this.secret)
  }
}

const makeSut = () => {
  return new TokenGenerator('any_secret')
}

describe('Token Generator', () => {
  test('should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('should return a token if JWT returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('should call jwt with correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })
})
