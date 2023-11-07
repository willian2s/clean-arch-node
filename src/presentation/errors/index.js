const MissingParamError = require('./missing-param-error')
const InternalServerError = require('./internal-server-error')
const InvalidParamError = require('./invalid-param-error')
const UnauthorizedError = require('./unauthorized-error')

module.exports = {
  MissingParamError,
  InvalidParamError,
  UnauthorizedError,
  InternalServerError
}
