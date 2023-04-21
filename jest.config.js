/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testRegex: '\\.(test|spec)\\.ts$',
  collectCoverage : true,
};
