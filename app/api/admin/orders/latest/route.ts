import {NextResponse} from 'next/server';
import {sql} from '@vercel/postgres';
import {ensureDb} from '@/lib/database';
import {isAdmin} from '@/lib/adminAuth';
export async function GET(){
 if(!(await isAdmin())) return NextResponse.json({error:'Unauthorized'},{status:401});
 try{await ensureDb();const {rows}=await sql`SELECT id,product,quantity,total,customer_name,created_at FROM orders ORDER BY id DESC LIMIT 1`;const {rows:countRows}=await sql`SELECT COUNT(*)::int AS count FROM orders WHERE status='New'`;return NextResponse.json({order:rows[0]||null,newCount:Number(countRows[0]?.count||0)},{headers:{'Cache-Control':'no-store'}})}catch(e){console.error(e);return NextResponse.json({error:'Database error'},{status:500})}
}
