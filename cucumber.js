module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["test/e2e/features/"],
    publishQuiet: true,
    dryRun: false,
    require: [
      "test/e2e/features/**/*.ts",
      "test/e2e/common/common.ts",
      "test/e2e/hooks/hooks.ts",
    ],
    requireModule: ["ts-node/register"],
    parallel: 1,
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    publishQuiet: true,
    dryRun: false,
    require: [
      "test/e2e/features/**/*.ts",
      "test/e2e/common/common.ts",
      "src/hooks/hooks.ts",
    ],
    requireModule: ["ts-node/register"],
    parallel: 1,
  },
};
