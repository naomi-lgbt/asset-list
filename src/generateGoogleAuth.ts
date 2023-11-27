import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import { authenticate } from "@google-cloud/local-auth";

const scopes = ["https://www.googleapis.com/auth/drive.readonly"];

const credentialsPath = join(process.cwd(), "drive", "credentials.json");
const tokenPath = join(process.cwd(), "drive", "token.json");

(async () => {
  const client = await authenticate({
    scopes,
    keyfilePath: credentialsPath,
  });
  if (!client.credentials) {
    throw new Error("Failed to auth the client. Try again.");
  }
  const credentials = await readFile(credentialsPath, "utf-8");
  const keys = JSON.parse(credentials);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await writeFile(tokenPath, payload, "utf-8");
})();
