/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testRegex: '.*\\.(spec|e2e-spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!octokit|@octokit|universal-user-agent)'],
  moduleNameMapper: {
    '^octokit$': '<rootDir>/test/__mocks__/octokitMock.js',
    '^@octokit/core$': '<rootDir>/test/__mocks__/octokitMock.js',
    '^before-after-hook$': '<rootDir>/test/__mocks__/octokitMock.js',
    '^universal-user-agent$': '<rootDir>/test/__mocks__/octokitMock.js',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};
