export class MissingParamError extends Error {
  /**
   *
   * @param {string} paramName
   */
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
