import Link from 'next/link';
import {sql} from '@vercel/postgres';
import {seedProducts} from '@/lib/database';
export const dynamic='force-dynamic';

export default async function Home(){
  await seedProducts();
  const{rows:products}=await sql`SELECT * FROM products WHERE active=true ORDER BY featured DESC,created_at DESC`;
  const p=products[0];
  return <main className="weyvo-home">
    <style>{`
      .weyvo-hero{position:relative;min-height:720px;height:calc(100svh - 92px);max-height:900px;background:#0b0b0b;overflow:hidden;display:flex;align-items:center}
      .weyvo-hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:.86}
      .weyvo-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.34) 58%,rgba(0,0,0,.08)),linear-gradient(0deg,rgba(0,0,0,.42),transparent 42%)}
      .weyvo-hero-copy{position:relative;z-index:2;color:#fff;max-width:720px;margin-left:clamp(20px,8vw,110px);padding:30px}
      .weyvo-kicker{font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:#d7b36a;font-weight:900}
      .weyvo-hero h1{font-size:clamp(58px,8vw,112px);line-height:.86;letter-spacing:-6px;margin:16px 0}
      .weyvo-hero h1 span{color:#d7b36a;font-family:Georgia,serif;font-weight:400}
      .weyvo-hero p{font-size:18px;line-height:1.65;color:#eee;max-width:560px;margin-bottom:30px}
      .weyvo-cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:#d6ad63;color:#111;border-radius:999px;padding:16px 26px;font-weight:950;text-decoration:none;box-shadow:0 12px 35px rgba(0,0,0,.28)}
      .weyvo-cta:hover{transform:translateY(-2px)}
      .weyvo-video-note{position:absolute;z-index:2;right:28px;bottom:24px;color:#fff;font-size:11px;letter-spacing:.15em;text-transform:uppercase;opacity:.7}
      .weyvo-trust{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#ded9d0;border:1px solid #ded9d0;margin-top:-1px}
      .weyvo-trust>div{background:#f7f4ef;padding:25px 20px;text-align:center}.weyvo-trust b{display:block;font-size:13px}.weyvo-trust span{display:block;margin-top:5px;color:#777;font-size:11px}
      .weyvo-details{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;background:#f5f2ed;padding-top:90px;padding-bottom:90px}
      .weyvo-details h2{font-size:clamp(44px,6vw,82px);line-height:.9;letter-spacing:-4px;margin:16px 0 25px}.weyvo-details h2 em{font-family:Georgia,serif;font-weight:400}.weyvo-details p{font-size:16px;line-height:1.85;color:#666;max-width:560px}
      .weyvo-details img{width:100%;height:580px;object-fit:cover;border-radius:28px}
      .weyvo-product-card{max-width:680px;margin:auto}.weyvo-product-card .product-image{height:650px}.weyvo-product-card .product-image img{object-fit:cover}.weyvo-product-card .product-meta{padding:20px 4px}.weyvo-product-card h3{font-size:28px}.weyvo-product-card .product-price-small{font-size:19px;font-weight:950}
      .weyvo-strip{background:#111;color:#fff;text-align:center;padding:18px;font-size:12px;letter-spacing:.12em;text-transform:uppercase}.weyvo-strip strong{color:#d7b36a}
      @media(max-width:700px){.weyvo-hero{height:690px;min-height:0}.weyvo-hero video{object-position:58% center}.weyvo-hero-copy{margin-left:0;align-self:flex-end;padding:24px 22px 55px}.weyvo-hero h1{font-size:61px;letter-spacing:-3px}.weyvo-hero p{font-size:15px}.weyvo-trust{grid-template-columns:1fr 1fr}.weyvo-details{grid-template-columns:1fr;gap:30px;padding-top:55px;padding-bottom:55px}.weyvo-details img{height:420px}.weyvo-product-card .product-image{height:450px}.weyvo-video-note{right:15px;bottom:12px}}
    `}</style>
    <div className="announcement"><div className="announcement-track"><span>FREE DELIVERY ACROSS EGYPT</span><b>•</b><span>CASH ON DELIVERY</span><b>•</b><span><strong>BUY 2+ & SAVE</strong></span><b>•</b><span>WEYVO WALLET · PREMIUM EVERYDAY CARRY</span></div></div>
    <nav className="nav container"><Link href="/" className="brand">WEYVO</Link><div className="navlinks"><a href="#shop">Shop</a><a href="#offers">Offers</a><a href="#details">Why WEYVO</a><Link href="/admin/login">Admin</Link></div></nav>
    <section className="weyvo-hero">
      <video autoPlay muted loop playsInline preload="metadata" poster="/hero.jpg"><source src="/wallet-video.mp4" type="video/mp4"/></video>
      <div className="weyvo-hero-copy"><div className="weyvo-kicker">THE WEYVO COLLECTION</div><h1>Carry less.<br/><span>Live more.</span></h1><p>A compact multifunctional wallet built to keep your cash, cards and essentials organized — without the bulk.</p><Link className="weyvo-cta" href={p?`/products/${p.slug}`:'/products/weyvo-wallet'}>Shop the WEYVO Wallet <span>→</span></Link></div>
      <div className="weyvo-video-note">WEYVO / EVERYDAY CARRY</div>
    </section>
    <div className="weyvo-strip"><strong>399 EGP</strong> &nbsp; · &nbsp; Limited launch price &nbsp; · &nbsp; Cash on delivery available</div>
    <section className="container"><div className="weyvo-trust"><div><b>PREMIUM MATERIALS</b><span>Made for everyday use</span></div><div><b>SMART STORAGE</b><span>Cards, cash & essentials</span></div><div><b>SLIM PROFILE</b><span>Fits your pocket</span></div><div><b>SECURE BUILD</b><span>Reinforced hardware</span></div></div></section>
    <section id="offers" className="container section offers-section"><div className="section-head"><div><div className="eyebrow">BUY MORE. SAVE MORE.</div><h2>Better together.</h2></div><span>Automatic bundle pricing</span></div><div className="offer-grid"><Link className="offer-card" href="/checkout?product=weyvo-wallet&quantity=1"><span>01</span><h3>Buy 1</h3><strong>399 EGP</strong><p>One WEYVO Wallet for everyday carry.</p></Link><Link className="offer-card featured-offer" href="/checkout?product=weyvo-wallet&quantity=2"><span>02 · BEST VALUE</span><h3>Buy 2</h3><strong>699 EGP</strong><p>Save 99 EGP · 349.5 EGP each.</p></Link><Link className="offer-card" href="/checkout?product=weyvo-wallet&quantity=3"><span>03 · BEST SAVING</span><h3>Buy 3</h3><strong>949 EGP</strong><p>Save 248 EGP · about 316 EGP each.</p></Link></div></section>
    <section id="shop" className="container section shop-section"><div className="section-head"><div><div className="eyebrow">SHOP WEYVO</div><h2>The WEYVO Wallet.</h2></div></div>{p&&<Link className="product-card weyvo-product-card" href={`/products/${p.slug}`}><div className="product-image"><span className="sale">NEW</span><img src={p.images?.[0]||'/royal-wallet.webp'} alt="WEYVO Wallet"/><span className="quick">View product →</span></div><div className="product-meta"><div><h3>WEYVO Wallet</h3><p>Premium everyday carry</p></div><div className="product-price-small">399 EGP <del>599</del></div></div></Link>}</section>
    <section id="details" className="container section weyvo-details"><div><div className="eyebrow">BUILT FOR EVERYDAY LIFE</div><h2>Everything you need.<br/><em>Nothing you don't.</em></h2><p>Designed around practical storage, easy access and a compact profile. WEYVO combines a water-resistant interior lining, reinforced metal hardware and multiple compartments in one everyday carry.</p><Link className="weyvo-cta" href={p?`/products/${p.slug}`:'/products/weyvo-wallet'}>See all details →</Link></div><img src="/royal-wallet.webp" alt="WEYVO Wallet"/></section>
    <section className="container section feature-section"><div className="features"><div className="feature"><span>01</span><h3>Smart storage</h3><p>Multiple compartments keep cards, cash and essentials organized.</p></div><div className="feature"><span>02</span><h3>Secure build</h3><p>Reinforced metal hardware and a water-resistant interior lining.</p></div><div className="feature"><span>03</span><h3>Compact profile</h3><p>Made to stay practical without feeling bulky in your pocket.</p></div><div className="feature"><span>04</span><h3>Perfect gift</h3><p>A clean, useful everyday wallet that works for almost anyone.</p></div></div></section>
    <footer className="footer"><div className="container"><div className="brand">WEYVO</div><p>Premium everyday carry.</p><span>© 2026 WEYVO</span></div></footer>
  </main>
}
