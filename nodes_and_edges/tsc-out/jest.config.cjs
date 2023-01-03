/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ["<rootDir>", "<rootDir>/src", "node_modules"],
    testPathIgnorePatterns: ['/dist/', '/tsc-out/'],
};
export {};
