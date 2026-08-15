import { sql } from '@vercel/postgres';

const connectionString = process.env.POSTGRES_URL || process.env.STORAGE_URL || process.env.DATABASE_URL;
if (connectionString && !process.env.POSTGRES_URL) process.env.POSTGRES_URL = connectionString;

export async function ensureDb() {
  if (!process.env.POSTGRES_URL) throw new Error('Database connection is missing.');
  await sql`CREATE TABLE IF NOT EXISTS orders (id BIGSERIAL PRIMARY KEY,order_number TEXT UNIQUE NOT NULL,product TEXT NOT NULL,color TEXT NOT NULL,quantity INTEGER NOT NULL CHECK(quantity>0),unit_price INTEGER NOT NULL,total INTEGER NOT NULL,customer_name TEXT NOT NULL,phone TEXT NOT NULL,governorate TEXT NOT NULL,area TEXT NOT NULL,address TEXT NOT NULL,notes TEXT DEFAULT '',status TEXT NOT NULL DEFAULT 'New',created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`;
  await sql`CREATE TABLE IF NOT EXISTS products (id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,description TEXT DEFAULT '',price INTEGER NOT NULL,compare_price INTEGER,images TEXT[] DEFAULT ARRAY[]::TEXT[],category TEXT DEFAULT 'Wallets',featured BOOLEAN DEFAULT false,active BOOLEAN DEFAULT true,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`;
}

export async function seedProducts() {
  await ensureDb();
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM products`;
  if (Number(rows[0]?.count) > 0) return;
  const products: Array<{name:string;slug:string;description:string;price:number;comparePrice:number;images:string[];featured:boolean}> = [
    {name:'WEYVO Smart Wallet',slug:'weyvo-smart-wallet',description:'Minimal everyday wallet with a premium finish, RFID protection and smart contact sharing.',price:649,comparePrice:1299,images:['/hero.jpg','/open.jpg','/cards.jpg','/nfc.jpg'],featured:true},
    {name:'WEYVO Brown Edition',slug:'weyvo-brown-edition',description:'Classic brown finish for a refined everyday carry.',price:649,comparePrice:1299,images:['/brown.png','/hero.jpg'],featured:false},
    {name:'WEYVO Black Edition',slug:'weyvo-black-edition',description:'Stealth black finish with a clean modern profile.',price:649,comparePrice:1299,images:['/black.png','/hero.jpg'],featured:false},
    {name:'WEYVO Beige Edition',slug:'weyvo-beige-edition',description:'Soft beige finish designed for a premium minimal look.',price:649,comparePrice:1299,images:['/beige.png','/hero.jpg'],featured:false},
    {name:'WEYVO Blue Edition',slug:'weyvo-blue-edition',description:'Deep blue finish for a distinctive everyday carry.',price:649,comparePrice:1299,images:['/blue.png','/hero.jpg'],featured:false}
  ];
  for (const p of products) {
    const imagesJson = JSON.stringify(p.images);
    await sql`INSERT INTO products(name,slug,description,price,compare_price,images,featured) VALUES(${p.name},${p.slug},${p.description},${p.price},${p.comparePrice},ARRAY(SELECT jsonb_array_elements_text(${imagesJson}::jsonb)),${p.featured}) ON CONFLICT(slug) DO NOTHING`;
  }
}
