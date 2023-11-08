class Validator {
  isValid = true
  email = null

  isEmail (email) {
    this.email = email
    return this.isValid
  }
}

module.exports = new Validator()
