import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json", // Указываем tsconfig для ts-jest
      },
    ],
    "^.+\\.module\\.css$": "jest-css-modules-transform",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Исправлено регулярное выражение
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};

export default config;
