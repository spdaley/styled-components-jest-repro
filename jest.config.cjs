module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/**/*.spec.jsx'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  }
};
