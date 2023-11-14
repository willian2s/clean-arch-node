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

  test('Should throw if no data are provided', async () => {
    const sut = makeSut()
    const promise = sut.compare()
    expect(promise).rejects.toThrow(new MissingParamError('data'))
  })

  test('Should throw if no encrypted are provided', async () => {
    const sut = makeSut()
    const promise = sut.compare('any_data')
    expect(promise).rejects.toThrow(new MissingParamError('encrypted'))
  })
})
