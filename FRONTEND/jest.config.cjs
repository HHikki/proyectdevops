module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "^react-markdown$": "<rootDir>/__mocks__/react-markdown.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  // Unificamos transformIgnorePatterns para que transforme swiper y otros módulos que necesitas
  transformIgnorePatterns: [
    "node_modules/(?!(swiper|react-markdown|remark-.*|unified|bail|trough|vfile|mdast-util.*|micromark.*|hast-util.*|unist-util.*|property-information|comma-separated-tokens|estree-util-is-identifier-name)/)",
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
