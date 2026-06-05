import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppConfig = {
  port: 3000,
  publicDir: path.join(__dirname, "../../public"),
} as const;
