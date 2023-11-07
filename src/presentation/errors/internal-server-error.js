module.exports = class InternalServerError extends Error {
  constructor () {
    super('There was a server error, please try again later.')
    this.name = 'InternalServerError'
  }
}
