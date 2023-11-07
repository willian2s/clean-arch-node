const validator = require('validator')

class EmailValidator {
  /**
   *
   * @param {string} email
   * @returns {boolean}
   */
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should return true with validator returns true', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('valid@mail.com')

    expect(isValid).toBe(true)
  })
})
