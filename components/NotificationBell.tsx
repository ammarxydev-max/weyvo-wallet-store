'use client';
import {useEffect,useRef,useState} from 'react';
export default function NotificationBell(){
 const [count,setCount]=useState(0); const [enabled,setEnabled]=useState(false); const lastId=useRef<number|null>(null);
 useEffect(()=>{ if(typeof window==='undefined') return; if('Notification' in window){if(Notification.permission==='granted')setEnabled(true);else Notification.requestPermission().then(p=>setEnabled(p==='granted'));}
  const poll=async()=>{try{const r=await fetch('/api/admin/orders/latest',{cache:'no-store'});if(!r.ok)return;const d=await r.json();const latest=d.order;if(!latest)return;if(lastId.current===null){lastId.current=Number(latest.id);setCount(Number(d.newCount||0));return;}if(Number(latest.id)>lastId.current){lastId.current=Number(latest.id);setCount(c=>c+1);if('Notification'in window&&Notification.permission==='granted')new Notification('🛍️ New WEYVO Order',{body:`${latest.product} × ${latest.quantity} — ${latest.total} EGP`,tag:'weyvo-new-order'});}}catch{}};
  poll();const timer=setInterval(poll,10000);return()=>clearInterval(timer);
 },[]);
 const enable=async()=>{if(!('Notification'in window))return;const p=await Notification.requestPermission();setEnabled(p==='granted');};
 return <button type="button" onClick={enable} title={enabled?'Order notifications are enabled':'Enable order notifications'} style={{position:'relative',border:0,background:'transparent',fontSize:22,cursor:'pointer',padding:'6px 10px'}}>🔔{count>0&&<span style={{position:'absolute',top:0,right:0,minWidth:18,height:18,padding:'0 4px',borderRadius:99,background:'#b42318',color:'#fff',fontSize:11,lineHeight:'18px',fontWeight:700}}>{count>99?'99+':count}</span>}</button>;
}
