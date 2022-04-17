module.exports = {
  testEnvironment: "node",
  transform: {
    ".(ts|tsx)": "<rootDir>/preprocessor.js"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
  moduleNameMapper: {
    "^@app/(.*)": "<rootDir>/src/app/$1",
    "^@core/(.*)": "<rootDir>/src/core/$1",
    "^@config/(.*)": "<rootDir>/src/config/$1",
    "^@shared/(.*)": "<rootDir>/src/shared/$1",
    "^@types/(.*)": "<rootDir>/src/shared/types/$1",
    "^@infrastructure/(.*)": "<rootDir>/src/infrastructure/$1"
  },
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 80,
      lines: 50,
      statements: 70,
      "ts-jest": {
        diagnostics: {
          exclude: ["**"]
        }
      }
    }
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "main.ts",
    "entrypoint.ts",
    "container.ts",
    ".mock.ts",
    "db",
    "test[A-Za-z]*.ts",
    "I[A-Za-z]*.ts",
    "[A-Za-z]*.d.ts",
    "<rootDir>/src/index.ts",
    "[A-Za-z]*dto.ts",
    "keys*.*",
    "[A-Za-z]*.container.*"
  ]
};
