import {NextResponse} from 'next/server';import {sql} from '@vercel/postgres';import {ensureDb,seedProducts} from '@/lib/database';
export const dynamic='force-dynamic';
export async function GET(){try{await seedProducts();const {rows}=await sql`SELECT * FROM products WHERE active=true ORDER BY featured DESC,created_at DESC`;return NextResponse.json(rows)}catch(e){console.error(e);return NextResponse.json({error:'Could not load products'},{status:500})}}
