module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.spec\\.tsx?$',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/_tests/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
