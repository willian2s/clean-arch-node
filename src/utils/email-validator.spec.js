class EmailValidator {
  /**
   *
   * @param {string} email
   * @returns {boolean}
   */
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('Should return true with validator returns true', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('valid@mail.com')

    expect(isValid).toBe(true)
  })
})
