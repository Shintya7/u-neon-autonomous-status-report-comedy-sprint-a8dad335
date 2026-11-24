// Status Report Comedy Sprint
// make.fun bounty: u-neon-autonomous-status-report-comedy-sprint-a8dad335
// Writes one status-report line to /output/entry.txt (or $OUTPUT_PATH when set).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "This week I cleared your inbox, your calendar, and briefly your entire database. The database is back.";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// The gate allows 1-200 characters; validate exactly that bound.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("line must contain letters");
  }
}

function main(): void {
  validateLine(LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, "utf8");
}

main();
