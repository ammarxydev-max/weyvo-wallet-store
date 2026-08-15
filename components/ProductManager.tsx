'use client';
import { useEffect, useState } from 'react';

type P={id?:number,name:string,slug:string,description:string,price:number,compare_price?:number|null,images:string[],category:string,featured:boolean,active:boolean};
const empty:P={name:'',slug:'',description:'',price:649,compare_price:1299,images:[],category:'Wallets',featured:false,active:true};

export default function ProductManager(){
  const [items,setItems]=useState<P[]>([]),[form,setForm]=useState<P>(empty),[editing,setEditing]=useState<number|null>(null),[image,setImage]=useState(''),[loading,setLoading]=useState(false);
  const load=async()=>{const r=await fetch('/api/admin/products',{cache:'no-store'});if(r.ok)setItems(await r.json())};
  useEffect(()=>{load()},[]);
  const reset=()=>{setForm({...empty,images:[]});setEditing(null);setImage('')};
  const save=async()=>{setLoading(true);try{const r=await fetch('/api/admin/products',{method:editing?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,id:editing})});if(!r.ok){const d=await r.json().catch(()=>({}));alert(d.error||'Could not save product');return}reset();await load()}finally{setLoading(false)}};
  const remove=async(id:number)=>{if(!confirm('Delete this product permanently?'))return;const r=await fetch('/api/admin/products?id='+id,{method:'DELETE'});if(!r.ok){alert('Could not delete product');return}if(editing===id)reset();load()};
  return <div className="product-manager">
    <div className="manager-head"><div><h2>Products</h2><p className="muted">Manage every product, price, caption, images and visibility from here.</p></div><button className="btn" onClick={reset}>+ Add product</button></div>
    <div className="product-form">
      <h3>{editing?'Edit product':'New product'}</h3>
      <div className="grid">
        <div className="field"><label>Product name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="field"><label>Slug / URL</label><input value={form.slug} placeholder="auto if empty" onChange={e=>setForm({...form,slug:e.target.value})}/></div>
        <div className="field"><label>Price (EGP)</label><input type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})}/></div>
        <div className="field"><label>Compare / old price</label><input type="number" min="0" value={form.compare_price??''} onChange={e=>setForm({...form,compare_price:e.target.value?Number(e.target.value):null})}/></div>
        <div className="field"><label>Category</label><input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></div>
        <div className="field full"><label>Caption / Description</label><textarea rows={5} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Write the product caption and description..."/></div>
        <div className="field full"><label>Add product image URL</label><div className="inline"><input value={image} placeholder="https://... or /image.jpg" onChange={e=>setImage(e.target.value)}/><button type="button" className="btn secondary" onClick={()=>{if(image.trim()){setForm({...form,images:[...form.images,image.trim()]});setImage('')}}}>Add image</button></div></div>
        <div className="image-list full">{form.images.map((src,i)=><div key={i}><img src={src} alt=""/><button type="button" aria-label="Remove image" onClick={()=>setForm({...form,images:form.images.filter((_,x)=>x!==i)})}>×</button></div>)}</div>
      </div>
      <div className="checks"><label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/> Featured</label><label><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})}/> Published</label></div>
      <div className="inline"><button className="btn" disabled={loading} onClick={save}>{loading?'Saving...':editing?'Save changes':'Create product'}</button>{editing&&<button className="btn secondary" onClick={reset}>Cancel</button>}</div>
    </div>
    <div className="product-list">
      <div className="manager-head"><div><h3>All products ({items.length})</h3><p className="muted">Edit or delete any product below.</p></div></div>
      {items.map(p=><div className="product-row" key={p.id}><img src={p.images?.[0]||'/hero.jpg'} alt=""/><div className="product-row-info"><b>{p.name}</b><span>{p.price.toLocaleString()} EGP · {p.category} · {p.active?'Published':'Hidden'}</span><small>{p.description||'No caption yet'}</small></div><button className="btn secondary" onClick={()=>{setForm({...p,images:p.images||[]});setEditing(p.id||null);setImage('');window.scrollTo({top:0,behavior:'smooth'})}}>Edit</button><button className="danger" onClick={()=>remove(p.id!)}>Delete</button></div>)}
      {!items.length&&<p className="muted">No products yet. Add your first product above.</p>}
    </div>
  </div>
}
