module.exports = class InvalidParamError extends Error {
  /**
   *
   * @param {string} paramName
   */
  constructor (paramName) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
