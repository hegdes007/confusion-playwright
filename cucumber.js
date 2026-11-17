module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    format: ["progress"],
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
};
