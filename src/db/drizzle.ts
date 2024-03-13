import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL! as string,
});

const db = drizzle(pool, { schema });

export default db;
