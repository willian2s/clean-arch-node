const validator = require('validator')
const EmailValidator = require('./email-validator')
const { MissingParamError } = require('../errors')

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

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    validator.isValid = false
    sut.isValid('valid@mail.com')

    expect(validator.email).toBe('valid@mail.com')
  })

  test('Should throw if no email is provided', () => {
    const sut = makeSut()
    expect(sut.isValid).toThrow(new MissingParamError('email'))
  })
})
