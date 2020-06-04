module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  coverageDirectory: '.coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  watchPathIgnorePatterns: ['/node_modules/'],
  // moduleNameMapper: {
  //   '\\.(css|less|scss)$': '<rootDir>/test/__mocks__.js',
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
};
