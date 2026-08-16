import {redirect} from 'next/navigation';
import {sql} from '@vercel/postgres';
import {ensureDb} from '@/lib/database';
import {isAdmin} from '@/lib/adminAuth';
import OrderList from '@/components/OrderList';
import ProductManager from '@/components/ProductManager';
import ReviewManager from '@/components/ReviewManager';
import NotificationBell from '@/components/NotificationBell';
import './admin.css';

export const dynamic='force-dynamic';

export default async function Admin(){
 if(!(await isAdmin())) redirect('/admin/login');
 await ensureDb();
 const {rows}=await sql`SELECT id,order_number,product,color,quantity,total,customer_name,phone,governorate,area,address,notes,status,payment_method,payment_proof,payment_status,created_at FROM orders ORDER BY created_at DESC`;
 const {rows:products}=await sql`SELECT id,name,price FROM products ORDER BY created_at DESC`;
 const stats={
  total:rows.length,
  revenue:rows.reduce((sum,x)=>sum+Number(x.total||0),0),
  new:rows.filter(x=>x.status==='New').length,
  delivered:rows.filter(x=>x.status==='Delivered').length,
 };
 return <main className="admin-shell">
  <header className="adminbar">
   <div className="admin-brand"><span>WEYVO</span><small>CONTROL CENTER</small></div>
   <div className="admin-actions"><NotificationBell/><a href="/api/admin/logout" className="logout">Logout</a></div>
  </header>
  <div className="adminmain">
   <div className="dashboard-hero"><div><span className="admin-eyebrow">STORE MANAGEMENT</span><h1>Dashboard</h1><p>Manage products, orders and customer reviews from one place.</p></div><div className="dashboard-date">Live store<br/><b>Egypt · EGP</b></div></div>
   <section className="dashboard-stats">
    <div className="stat-card"><span>Total orders</span><strong>{stats.total}</strong><small>All orders</small></div>
    <div className="stat-card"><span>Revenue</span><strong>{stats.revenue.toLocaleString()} <i>EGP</i></strong><small>Order value</small></div>
    <div className="stat-card stat-new"><span>New orders</span><strong>{stats.new}</strong><small>Needs attention</small></div>
    <div className="stat-card"><span>Delivered</span><strong>{stats.delivered}</strong><small>Completed orders</small></div>
   </section>
   <section className="admin-section products-panel"><div className="section-heading"><div><span className="admin-eyebrow">CATALOG</span><h2>Products</h2><p>{products.length} products · edit prices, captions and images below.</p></div></div><ProductManager/></section>
   <section className="admin-section reviews-panel"><div className="section-heading"><div><span className="admin-eyebrow">SOCIAL PROOF</span><h2>Reviews</h2><p>Manage product reviews from the same dashboard.</p></div></div><ReviewManager products={products as any}/></section>
   <section className="admin-section orders-panel"><div className="section-heading"><div><span className="admin-eyebrow">SALES</span><h2>Orders</h2><p>Search, filter, update status or delete an order.</p></div><div className="live-pill"><span/> Live</div></div><OrderList initialOrders={rows as any}/></section>
  </div>
 </main>
}
