import { sql } from '@vercel/postgres';

// Neon was connected with a custom prefix, so Vercel can expose STORAGE_URL
// instead of the POSTGRES_URL expected by @vercel/postgres.
const connectionString =
  process.env.POSTGRES_URL ||
  process.env.STORAGE_URL ||
  process.env.DATABASE_URL;

if (connectionString && !process.env.POSTGRES_URL) {
  process.env.POSTGRES_URL = connectionString;
}

export async function ensureDb() {
  if (!process.env.POSTGRES_URL) {
    throw new Error(
      'Database connection is missing. Configure POSTGRES_URL or connect the Neon integration with the POSTGRES prefix.'
    );
  }

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      product TEXT NOT NULL,
      color TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      unit_price INTEGER NOT NULL,
      total INTEGER NOT NULL,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      governorate TEXT NOT NULL,
      area TEXT NOT NULL,
      address TEXT NOT NULL,
      notes TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New','Confirmed','Shipped','Delivered')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}
