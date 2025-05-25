module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(svg|png|jpg|gif)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "node_modules/(?!swiper)", // <--- permite que Jest transforme swiper
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // js, jsx, ts, tsx
    "^.+\\.mjs$": "babel-jest", // <--- añade esta línea
  },
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
