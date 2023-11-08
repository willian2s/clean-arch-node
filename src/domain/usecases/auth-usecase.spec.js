class AuthUseCase {
  /**
   *
   * @param {string} email
   * @returns {string}
   */
  async auth (email) {
    if (!email) {
      throw new Error()
    }
  }
}

describe('AuthUseCase', () => {
  test('Should throw with no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow()
  })
})
