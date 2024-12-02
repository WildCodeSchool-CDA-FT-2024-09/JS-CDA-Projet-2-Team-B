import type { Config } from 'jest';

const config: Config = {
  rootDir: './api/product',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts']
};

export default config;
