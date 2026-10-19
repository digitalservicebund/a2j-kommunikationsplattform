import * as path from "node:path";

// Test data directory (tests/e2e/data/)
const testDataPath = path.join(import.meta.dirname, "..", "data");

/**
 * Returns the absolute path of the test data file with the given filename.
 */
export function getTestDataFilePath(filename: string) {
  return path.join(testDataPath, filename);
}
