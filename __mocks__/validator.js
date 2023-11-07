class Validator {
  isValid = true

  isEmail (email) {
    return this.isValid
  }
}

module.exports = new Validator()
