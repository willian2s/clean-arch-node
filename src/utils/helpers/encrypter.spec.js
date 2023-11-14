const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const { MissingParamError } = require('../errors')

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

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamError('data'))
    expect(sut.compare('any_data')).rejects.toThrow(new MissingParamError('encrypted'))
  })
})
