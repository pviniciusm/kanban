/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // All imported modules in your tests should be mocked automatically
    // automock: false,

    // Stop running tests after `n` failures
    // bail: 0,

    // The directory where Jest should store its cached dependency information
    // cacheDirectory: "C:\\Users\\pvini\\AppData\\Local\\Temp\\jest",

    // Automatically clear mock calls, instances and results before every test
    // clearMocks: false,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: false,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // A list of paths to directories that Jest should use to search for files in
    roots: ["<rootDir>/src"],

    // The test environment that will be used for testing
    testEnvironment: "node",

    // A map from regular expressions to paths to transformers
    transform: {
        ".+\\.ts$": "ts-jest",
    },
};
