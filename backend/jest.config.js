module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  setupFiles: ["./jest.setup.js"],

  globalTeardown: "./jest.teardown.js",

  moduleFileExtensions: ["js", "ts"],

  testMatch: ["**/tests/**/*.test.ts"],
};