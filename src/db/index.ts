import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Verificar que la variable de entorno está definida
if (!process.env.PASSWORD) {
  console.error("❌ ERROR: La variable PASSWORD no está definida");
}

// Evitar conectar en build
const isProduction = process.env.NODE_ENV === "production";

let pool: Pool | null = null;

if (!isProduction || process.env.RUNTIME_ENV === "server") {
  pool = new Pool({
    host: "db.nmnmnxhwyhvwzaabmtjy.supabase.co",
    port: 5432,
    user: "postgres",
    password: process.env.PASSWORD, 
    database: "postgres",
    ssl: { rejectUnauthorized: false },
  });
}

export const db = pool ? drizzle(pool, { schema }) : null;
