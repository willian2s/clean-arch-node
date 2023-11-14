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

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(true)
  })

  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(false)
  })
})
