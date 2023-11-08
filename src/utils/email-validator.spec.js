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

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true with validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid@mail.com')

    expect(isValid).toBe(true)
  })

  test('Should return false with validator returns false', () => {
    const sut = makeSut()
    validator.isValid = false
    const isValid = sut.isValid('invalid@mail.com')

    expect(isValid).toBe(false)
  })
})
