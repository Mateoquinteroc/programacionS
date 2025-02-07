import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  host: "db.nmnmnxhwyhvwzaabmtjy.supabase.co",
  port: 6543,
  user: "postgres",
  password: process.env.PASSWORD,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
