import {NextResponse} from 'next/server';
import {sql} from '@vercel/postgres';
import {ensureDb} from '@/lib/database';
import {isAdmin} from '@/lib/adminAuth';

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!(await isAdmin())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const {id}=await params;
  const {status}=await req.json();
  if(!['New','Confirmed','Shipped','Delivered'].includes(status)) return NextResponse.json({error:'Invalid status'},{status:400});
  await ensureDb();
  await sql`UPDATE orders SET status=${status},updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ok:true});
}

export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}){
  if(!(await isAdmin())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const {id}=await params;
  await ensureDb();
  const result=await sql`DELETE FROM orders WHERE id=${id} RETURNING id`;
  if(!result.rowCount) return NextResponse.json({error:'Order not found'},{status:404});
  return NextResponse.json({ok:true});
}
