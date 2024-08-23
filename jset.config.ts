import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: '.',  // Set to the project root
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/*.(t|j)s'
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'  // Adjust to map to the src directory
  }
};

export default config;