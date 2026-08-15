import {NextResponse} from 'next/server'; import {adminCookie} from '@/lib/adminAuth';
function out(req:Request){const r=NextResponse.redirect(new URL('/admin/login',req.url));r.cookies.set(adminCookie,'',{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:0});return r}
export async function POST(req:Request){return out(req)} export async function GET(req:Request){return out(req)}
