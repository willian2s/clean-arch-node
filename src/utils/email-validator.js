const validator = require('validator')

class EmailValidator {
  /**
   *
   * @param {string} email
   * @returns {boolean}
   */
  isValid (email) {
    return validator.isEmail(email)
  }
}

module.exports = EmailValidator
