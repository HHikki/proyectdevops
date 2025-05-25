module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js",
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
