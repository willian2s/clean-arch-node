/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageProvider: 'v8',
  testEnvironment: 'node'
}

module.exports = config
