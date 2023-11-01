class LoginRouter {
  /**
   *
   * @param {HttpRequest} httpRequest
   * @returns {HttpResponse}
   */
  route (httpRequest) {
    if (!httpRequest.body.email) {
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
})
