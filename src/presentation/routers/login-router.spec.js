import LoginRouter from './login-router'
import MissingParamError from '../helpers/missing-param-error'
import UnauthorizedError from '../helpers/unauthorized-error'

const makeSut = () => {
  class AuthUseCase {
    /**
     *
     * @param {string} email
     * @param {string} password
     * @returns {string}
     */
    auth (email, password) {
      this.email = email
      this.password = password

      return this.accessToken
    }
  }
  const authUseCaseSpy = new AuthUseCase()
  authUseCaseSpy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy)

  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Should returs 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'anypassword'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should returs 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should returs 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should returs 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        password: 'anyPassword'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid credential are provided', () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = null
    const httpRequest = {
      body: {
        email: 'invalid@mail.com',
        password: 'invalidPassword'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 200 when valid credential are provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'valid@mail.com',
        password: 'validPassword'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 500 if no AuthUseCase is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        password: 'anyPassword'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no AuthUseCase has no auth', () => {
    class AuthUseCase {}
    const authUseCase = new AuthUseCase()
    const sut = new LoginRouter(authUseCase)
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        password: 'anyPassword'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
