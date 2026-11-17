const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const browsers = ["chromium", "firefox", "webkit"];

const jsonDir = path.resolve("reports/json");
const reportDir = path.resolve("reports/cucumber-report");

function runBrowser(browser) {
  return new Promise((resolve) => {
    console.log(`\n========== Running ${browser} ==========\n`);

    const jsonFile = path.join(jsonDir, `${browser}.json`);

    const command = process.platform === "win32" ? "npx.cmd" : "npx";

    const child = spawn(
      command,
      ["cucumber-js", "--format", `json:${jsonFile}`],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          BROWSER_NAME: browser,
        },
        shell: process.platform === "win32",
      },
    );

    child.on("error", (error) => {
      console.error(`${browser} execution error:`, error);
      resolve(false);
    });

    child.on("close", (code) => {
      console.log(`${browser} finished with exit code ${code}`);
      resolve(code === 0);
    });
  });
}

async function runTests() {
  try {
    const { generate } = await import("multiple-cucumber-html-reporter");

    // Clean previous reports
    fs.rmSync("reports", { recursive: true, force: true });
    fs.mkdirSync(jsonDir, { recursive: true });

    // Run all three browsers simultaneously
    const results = await Promise.all(
      browsers.map((browser) => runBrowser(browser)),
    );

    console.log("\n========== Checking JSON files ==========\n");

    const jsonFiles = fs
      .readdirSync(jsonDir)
      .filter((file) => file.endsWith(".json"));

    console.log("JSON files found:", jsonFiles);

    if (jsonFiles.length !== 3) {
      throw new Error("Expected JSON results from all three browsers.");
    }
    // Add browser name to every feature name in JSON files

    const browserLabels = {
      chromium: "Chromium",
      firefox: "Firefox",
      webkit: "WebKit",
    };

    for (const browser of browsers) {
      const jsonFile = path.join(jsonDir, `${browser}.json`);

      // Read the browser's JSON report
      const features = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

      // Add browser name before every feature name
      features.forEach((feature) => {
        feature.name = `[${browserLabels[browser]}] ${feature.name}`;
      });

      // Save the modified JSON report
      fs.writeFileSync(jsonFile, JSON.stringify(features, null, 2));
    }
    console.log("\n========== Generating HTML Report ==========\n");

    await generate({
      jsonDir,
      reportPath: reportDir,
      reportName: "Playwright with Cucumber Report for conFusion project",
      pageTitle: "Playwright with Cucumber Report for conFusion project",
      displayDuration: true,
      displayReportTime: true,
      metadata: {
        browser: {
          name: "Chromium, Firefox and WebKit",
          version: "Multiple",
        },
      },
    });

    // Verify HTML generation
    const htmlFile = path.join(reportDir, "index.html");

    if (!fs.existsSync(htmlFile)) {
      throw new Error("HTML report was not generated!");
    }

    console.log("\n======================================");
    console.log("Consolidated HTML report generated!");
    console.log(`Report location: ${htmlFile}`);
    console.log("======================================\n");

    if (results.some((result) => !result)) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("\nReport generation failed:", error);
    process.exitCode = 1;
  }
}

runTests();
