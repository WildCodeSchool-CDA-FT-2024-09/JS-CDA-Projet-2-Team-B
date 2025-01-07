import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['./tests/jest.setup.ts']
};

export default config;
