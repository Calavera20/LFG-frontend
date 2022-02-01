const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

// const TS_CONFIG_PATH = './tsconfig.json';
// const SRC_PATH = '<rootDir>/src/';
// function makeModuleNameMapper(srcPath, tsconfigPath) {
//   // Get paths from tsconfig
//   const {paths} = require(tsconfigPath).compilerOptions;

//   const aliases = {};

//   // Iterate over paths and convert them into moduleNameMapper format
//   Object.keys(paths).forEach((item) => {
//       const key = item.replace('/*', '/(.*)');
//       const path = paths[item][0].replace('/*', '/$1');
//       aliases[key] = srcPath + '/' + path;
//   });
//   return aliases;
// }

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-app',
  paths: {
    "@App/*": [
      "src/*"
    ]},
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
  //   prefix: '<rootDir>/'
  // })
  // moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH)
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1"
  }
};