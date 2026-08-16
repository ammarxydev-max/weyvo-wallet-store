'use client';
import {useEffect,useRef,useState} from 'react';

type Alert={product:string;quantity:number;total:number;customer_name:string};
export default function NotificationBell(){
 const [count,setCount]=useState(0),[enabled,setEnabled]=useState(false),[toast,setToast]=useState<Alert|null>(null);const lastId=useRef<number|null>(null);const audio=useRef<AudioContext|null>(null);
 const notify=(order:Alert)=>{
  setToast(order);window.setTimeout(()=>setToast(null),6000);
  try{audio.current??=new AudioContext();const ctx=audio.current;const osc=ctx.createOscillator();const gain=ctx.createGain();osc.frequency.value=880;gain.gain.setValueAtTime(.0001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+.02);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.35);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.36)}catch{}
  if('Notification'in window&&Notification.permission==='granted')new Notification('New WEYVO order',{body:`${order.customer_name} · ${order.product} × ${order.quantity} · ${Number(order.total).toLocaleString()} EGP`,tag:`weyvo-${Date.now()}`});
 };
 useEffect(()=>{let alive=true;const poll=async()=>{try{const r=await fetch('/api/admin/orders/latest',{cache:'no-store'});if(!r.ok)return;const d=await r.json();if(!alive||!d.order)return;const id=Number(d.order.id);if(lastId.current===null){lastId.current=id;setCount(Number(d.newCount||0));return;}if(id>lastId.current){lastId.current=id;setCount(Number(d.newCount||0));notify(d.order)}}catch{}};poll();const timer=window.setInterval(poll,5000);return()=>{alive=false;window.clearInterval(timer)}},[]);
 const enable=async()=>{if(!('Notification'in window))return;const p=await Notification.requestPermission();setEnabled(p==='granted');try{audio.current??=new AudioContext();await audio.current.resume()}catch{}};
 return <><button type="button" className={`notification-bell ${enabled?'enabled':''}`} onClick={enable} title={enabled?'Notifications enabled — new orders are checked every 5 seconds':'Click to enable order notifications'}>🔔{count>0&&<span className="notification-count">{count>99?'99+':count}</span>}</button>{toast&&<div className="order-toast" role="status"><div className="toast-icon">✓</div><div><b>New order received</b><span>{toast.customer_name} · {toast.product}</span><small>{toast.quantity} × {Number(toast.total).toLocaleString()} EGP</small></div><button onClick={()=>setToast(null)} aria-label="Close">×</button></div>}</>;
}
