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

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(true)
  })

  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct params', async () => {
    const sut = makeSut()
    await sut.compare('any_data', 'hashed_data')
    expect(bcrypt.data).toBe('any_data')
    expect(bcrypt.encrypted).toBe('hashed_data')
  })
})
