import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'db.nmnmnxhwyhvwzaabmtjy.supabase.co',
    port: 5432,
    user: 'postgres',
    password: process.env.PASSWORD,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false,
      },
    // O "require", "allow", "prefer", etc. (depende de tu configuración)
  },
} satisfies Config;

