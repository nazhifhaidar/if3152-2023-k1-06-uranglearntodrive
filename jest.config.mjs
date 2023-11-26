
import nextJest from 'next/jest.js';
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest

const clientTestConfig = {
  // Add more setup options before each test is run
  displayName: 'client',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ["**/__test__/client/*.[jt]s?(x)"],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
}

const serverTestConfig = {
  displayName: "server",
  testEnvironment: "node",
  testMatch: ["**/__test__/server/*.[jt]s?(x)"],
  preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  projects: [await createJestConfig(clientTestConfig)(), await createJestConfig(serverTestConfig)()],
};
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config;