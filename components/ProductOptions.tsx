'use client';
import Link from 'next/link';
import {useState} from 'react';
const NFC=100;
const bundlePrice=(q:number)=>q===2?799:q>=3?1099:449;
export default function ProductOptions({slug,price}:{slug:string;price:number}){
 const[q,setQ]=useState(1),[nfc,setNfc]=useState(false);const wallet=bundlePrice(q);const total=wallet+(nfc?NFC*q:0);
 return <div className="purchase-options">
  <div className="option-label">1. Choose quantity</div>
  <div className="quantity-options">{[1,2,3].map(x=><button type="button" key={x} className={q===x?'quantity-choice active':'quantity-choice'} onClick={()=>setQ(x)}><span>{x} {x===1?'Wallet':'Wallets'}</span><b>{bundlePrice(x).toLocaleString()} EGP</b>{x>1&&<small>Save {((449*x)-bundlePrice(x)).toLocaleString()} EGP</small>}</button>)}</div>
  <div className="option-label">2. Choose your version</div>
  <div className="version-options"><button type="button" className={!nfc?'version-choice active':''} onClick={()=>setNfc(false)}><span className="radio-dot"/><div><b>Standard</b><small>No NFC chip</small></div><strong>{wallet.toLocaleString()} EGP</strong></button><button type="button" className={nfc?'version-choice active':''} onClick={()=>setNfc(true)}><span className="radio-dot"/><div><b>Smart NFC</b><small>Digital profile · +100 / wallet</small></div><strong>{(wallet+NFC*q).toLocaleString()} EGP</strong></button></div>
  <Link className="btn buy-selected" href={`/checkout?product=${encodeURIComponent(slug)}&quantity=${q}&nfc=${nfc?'1':'0'}`}>{nfc?`Buy ${q} with NFC — ${total.toLocaleString()} EGP`.replace('$',''):q===1?`Buy 1 — ${total.toLocaleString()} EGP`.replace('$',''):`Buy ${q} — ${total.toLocaleString()} EGP`.replace('$','')}</Link>
  <p className="selection-note">Your quantity and NFC choice will be saved automatically at checkout.</p>
 </div>
}
