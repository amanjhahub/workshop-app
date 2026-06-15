import { readFileSync, appendFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logPath = resolve(__dirname, "..", "debug-89d76c.log");
const endpoint =
  "http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8";

function log(location, message, data, hypothesisId, runId = "local-sim") {
  const entry = {
    sessionId: "89d76c",
    runId,
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  appendFileSync(logPath, JSON.stringify(entry) + "\n");
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "89d76c",
    },
    body: JSON.stringify(entry),
  }).catch(() => {});
}

function loadBackendEnv() {
  try {
    const envPath = resolve(__dirname, "..", "backend", ".env");
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
    return true;
  } catch {
    return false;
  }
}

function createMockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

async function runScenario(name, setup, runId = "local-sim") {
  await setup();
  const { default: handler } = await import(
    "../api/enquiry.js?" + Date.now()
  );
  const req = {
    method: "POST",
    body: {
      name: "Debug User",
      email: "debug@example.com",
      phone: "9876543210",
    },
  };
  const res = createMockRes();
  await handler(req, res);
  log(
    "scripts/debug-api.mjs:scenario",
    `Scenario ${name} completed`,
    {
      scenario: name,
      statusCode: res.statusCode,
      body: res.body,
      mongoUriSet: !!process.env.MONGO_URI,
    },
    name === "no-mongo-uri" ? "A" : "A,D",
    runId
  );
}

delete process.env.MONGO_URI;
await runScenario("no-mongo-uri", async () => {
  delete process.env.MONGO_URI;
}, "post-fix");

const envLoaded = loadBackendEnv();
log(
  "scripts/debug-api.mjs:env",
  "Backend env load check",
  { envLoaded, mongoUriSet: !!process.env.MONGO_URI },
  "A",
  "post-fix"
);

if (process.env.MONGO_URI) {
  await runScenario("with-mongo-uri", async () => {}, "post-fix");
}
