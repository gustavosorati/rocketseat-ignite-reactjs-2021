module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^.+\\.(scss|css|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,tsx}",
    "!src/**/*.spec.{js,jsx,tsx}",
  ],
  coverageReporters: ["lcov", "json"]
};
