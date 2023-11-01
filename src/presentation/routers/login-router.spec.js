class LoginRouter {
  /**
   * @typedef {Object} HttpRequest
   * @property {object} HttpRequest.body
   * @property {string} HttpRequest.body.email
   * @property {string} HttpRequest.body.password
   *
   * @param {HttpRequest} httpRequest
   * @returns {HttpResponse}
   */
  route (httpRequest) {
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login Router', () => {
  test('Should returs 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'anypassword'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should returs 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
