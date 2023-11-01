import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

const AccountModel = mongoose.model('Account')

module.exports = () => {
  const signupRouter = new SignupRouter()
  router.post('/signup', ExpressRouterAdapter.adapt(signupRouter))
}

class ExpressRouterAdapter {
  /**
   *
   * @param {object} router
   * @param {() => HttpResponse} router.route
   */
  static adapt (router) {
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    return async (req, res) => {
      const httpRequest = {
        body: req.request
      }
      const httpResponse = router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// Presentation Layer
// signup-router
class SignupRouter {
  /**
   *
   * @param {HttpRequest} httpRequest
   * @returns {Promise<HttpResponse>} res
   */
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SigunpUseCase().signUp({ email, password, repeatPassword })
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain Layer
// signup-use-case
class SigunpUseCase {
  /**
   *
   * @param {object} user
   * @param {string} user.email
   * @param {string} user.password
   * @param {string} user.repeatPassword
   * @returns {Promise<User>} Created User
   */
  async signUp ({ email, password, repeatPassword }) {
    if (password === repeatPassword) {
      const user = new AddAccountRepository().add({ email, password })
      return user
    }
  }
}

// Infra Layer
// add-account-repo
class AddAccountRepository {
  /**
   *
   * @param {object} user
   * @param {string} user.email
   * @param {string} user.password
   * @returns {Promise<User>} Created User
   */
  async add ({ email, password }) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
