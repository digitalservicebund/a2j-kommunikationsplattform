import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount components rendered by testing-library after each test.
afterEach(cleanup);

// Keep test output free of the app's own log lines.
process.env.LOG_LEVEL = "silent";
