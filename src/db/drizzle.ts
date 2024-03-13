import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon<boolean, boolean>(
  process.env.NEXT_PUBLIC_DATABASE_URL! as string
);

const db = drizzle(sql, { schema });

export default db;
