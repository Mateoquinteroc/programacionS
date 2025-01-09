// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'db.nmnmnxhwyhvwzaabmtjy.supabase.co', 
  port: 5432, 
  user: 'postgres', 
  password: process.env.PASSWORD, 
  database: 'postgres', 
  ssl: { rejectUnauthorized: false }, 
});

export const db = drizzle(pool);
