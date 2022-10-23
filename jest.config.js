module.exports = {
  "roots": [
    "."
  ],
  "testMatch": [
    // "./__tests__/index.test.ts"
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "src",
    "dist"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
