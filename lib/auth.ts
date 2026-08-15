import { cookies } from 'next/headers';
import crypto from 'crypto';
const COOKIE='weyvo_admin';
function signature(value:string){return crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'dev-secret').update(value).digest('hex');}
export function makeToken(){const value='admin:'+Date.now(); return value+'.'+signature(value);}
export async function isAdmin(){const c=await cookies(); const token=c.get(COOKIE)?.value; if(!token) return false; const [value,sig]=token.split('.'); if(!value||!sig||!value.startsWith('admin:')) return false; const expected=signature(value); return sig.length===expected.length && crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected));}
export const adminCookie=COOKIE;
