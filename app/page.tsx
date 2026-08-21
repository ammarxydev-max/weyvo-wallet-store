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
      .weyvo-hero{position:relative;min-height:720px;height:calc(100svh - 92px);max-height:900px;background:#090909;overflow:hidden;display:flex;align-items:center}
      .weyvo-hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:.9}
      .weyvo-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.4) 55%,rgba(0,0,0,.08)),linear-gradient(0deg,rgba(0,0,0,.5),transparent 48%)}
      .weyvo-hero-copy{position:relative;z-index:2;color:#fff;max-width:760px;margin-left:clamp(20px,8vw,110px);padding:30px}
      .weyvo-kicker{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#d7b36a;font-weight:900}
      .weyvo-hero h1{font-size:clamp(58px,8vw,112px);line-height:.84;letter-spacing:-6px;margin:16px 0}
      .weyvo-hero h1 span{color:#d7b36a;font-family:Georgia,serif;font-weight:400}
      .weyvo-hero p{font-size:18px;line-height:1.65;color:#eee;max-width:590px;margin-bottom:30px}
      .weyvo-cta{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:#d6ad63;color:#111;border-radius:999px;padding:17px 28px;font-weight:950;text-decoration:none;box-shadow:0 12px 35px rgba(0,0,0,.3);transition:transform .25s,box-shadow .25s}
      .weyvo-cta:hover{transform:translateY(-3px);box-shadow:0 18px 45px rgba(0,0,0,.38)}
      .weyvo-hero-proof{display:flex;gap:18px;flex-wrap:wrap;margin-top:22px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#ddd}.weyvo-hero-proof span{display:inline-flex;gap:7px;align-items:center}.weyvo-hero-proof b{color:#d7b36a}
      .weyvo-video-note{position:absolute;z-index:2;right:28px;bottom:24px;color:#fff;font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.72}
      .weyvo-trust{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#ded9d0;border:1px solid #ded9d0;margin-top:-1px}
      .weyvo-trust>div{background:#f7f4ef;padding:25px 20px;text-align:center}.weyvo-trust b{display:block;font-size:13px}.weyvo-trust span{display:block;margin-top:5px;color:#777;font-size:11px}
      .weyvo-details{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;background:#f5f2ed;padding-top:90px;padding-bottom:90px}
      .weyvo-details h2{font-size:clamp(44px,6vw,82px);line-height:.9;letter-spacing:-4px;margin:16px 0 25px}.weyvo-details h2 em{font-family:Georgia,serif;font-weight:400}.weyvo-details p{font-size:16px;line-height:1.85;color:#666;max-width:560px}
      .weyvo-details img{width:100%;height:580px;object-fit:cover;border-radius:28px}
      .weyvo-product-card{max-width:680px;margin:auto}.weyvo-product-card .product-image{height:650px}.weyvo-product-card .product-image img{object-fit:cover}.weyvo-product-card .product-meta{padding:20px 4px}.weyvo-product-card h3{font-size:28px}.weyvo-product-card .product-price-small{font-size:19px;font-weight:950}
      .weyvo-strip{background:#111;color:#fff;text-align:center;padding:18px;font-size:12px;letter-spacing:.12em;text-transform:uppercase}.weyvo-strip strong{color:#d7b36a}
      .weyvo-mini-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:30px}.weyvo-mini-grid img{width:100%;height:360px;object-fit:cover;border-radius:22px}.weyvo-mini-grid img:first-child{grid-column:span 2}
      @media(max-width:700px){.weyvo-hero{height:690px;min-height:0}.weyvo-hero video{object-position:58% center}.weyvo-hero-copy{margin-left:0;align-self:flex-end;padding:24px 22px 55px}.weyvo-hero h1{font-size:61px;letter-spacing:-3px}.weyvo-hero p{font-size:15px}.weyvo-trust{grid-template-columns:1fr 1fr}.weyvo-details{grid-template-columns:1fr;gap:30px;padding-top:55px;padding-bottom:55px}.weyvo-details img{height:420px}.weyvo-product-card .product-image{height:450px}.weyvo-video-note{right:15px;bottom:12px}.weyvo-mini-grid{grid-template-columns:1fr 1fr}.weyvo-mini-grid img{height:240px}.weyvo-mini-grid img:first-child{grid-column:1/-1}}
    `}</style>
    <div className="announcement"><div className="announcement-track"><span>FREE DELIVERY ACROSS EGYPT</span><b>•</b><span>CASH ON DELIVERY</span><b>•</b><span><strong>BUY 2+ & SAVE</strong></span><b>•</b><span>WEYVO · PREMIUM EVERYDAY CARRY</span></div></div>
    <nav className="nav container"><Link href="/" className="brand">WEYVO</Link><div className="navlinks"><a href="#shop">Shop</a><a href="#offers">Offers</a><a href="#details">Why WEYVO</a><Link href="/admin/login">Admin</Link></div></nav>
    <section className="weyvo-hero">
      <video autoPlay muted loop playsInline preload="metadata" poster="/hero.jpg"><source src="/wallet-video.mp4" type="video/mp4"/></video>
      <div className="weyvo-hero-copy"><div className="weyvo-kicker">THE WEYVO COLLECTION</div><h1>Carry less.<br/><span>Live more.</span></h1><p>A compact multifunctional wallet designed for cash, cards and everyday essentials — with a premium look that belongs in every pocket.</p><Link className="weyvo-cta" href={p?`/products/${p.slug}`:'/products/weyvo-wallet'}>Shop the WEYVO Wallet <span>→</span></Link><div className="weyvo-hero-proof"><span><b>✓</b> Cash on delivery</span><span><b>✓</b> Fast Egypt delivery</span><span><b>✓</b> 90-day guarantee</span></div></div>
      <div className="weyvo-video-note">WEYVO / EVERYDAY CARRY</div>
    </section>
    <div className="weyvo-strip"><strong>399 EGP</strong> &nbsp; · &nbsp; Launch price &nbsp; · &nbsp; Buy 2+ and save more</div>
    <section className="container"><div className="weyvo-trust"><div><b>PREMIUM MATERIALS</b><span>Soft-touch vegan leather</span></div><div><b>SMART STORAGE</b><span>Cash, cards & essentials</span></div><div><b>SLIM PROFILE</b><span>Made for every pocket</span></div><div><b>SECURE BUILD</b><span>Reinforced hardware</span></div></div></section>
    <section id="offers" className="container section offers-section"><div className="section-head"><div><div className="eyebrow">BUY MORE. SAVE MORE.</div><h2>One wallet. Better value.</h2></div><span>Bundle pricing applies automatically</span></div><div className="offer-grid"><Link className="offer-card" href="/checkout?product=weyvo-wallet&quantity=1"><span>01</span><h3>Buy 1</h3><strong>399 EGP</strong><p>Perfect for your everyday carry.</p></Link><Link className="offer-card featured-offer" href="/checkout?product=weyvo-wallet&quantity=2"><span>02 · BEST VALUE</span><h3>Buy 2</h3><strong>699 EGP</strong><p>Save 99 EGP · 349.5 EGP each.</p></Link><Link className="offer-card" href="/checkout?product=weyvo-wallet&quantity=3"><span>03 · BEST SAVING</span><h3>Buy 3</h3><strong>949 EGP</strong><p>Save 248 EGP · about 316 EGP each.</p></Link></div></section>
    <section id="shop" className="container section shop-section"><div className="section-head"><div><div className="eyebrow">SHOP WEYVO</div><h2>The WEYVO Wallet.</h2></div><span>Tap to explore the full product page</span></div>{p&&<Link className="product-card weyvo-product-card" href={`/products/${p.slug}`}><div className="product-image"><span className="sale">NEW</span><img src={p.images?.[0]||'/royal-wallet.webp'} alt="WEYVO Wallet"/><span className="quick">View product →</span></div><div className="product-meta"><div><h3>WEYVO Wallet</h3><p>Premium everyday carry</p></div><div className="product-price-small">399 EGP <del>599</del></div></div></Link>}</section>
    <section className="container section"><div className="section-head"><div><div className="eyebrow">SEE IT FROM EVERY ANGLE</div><h2>Made to be used.</h2></div></div><div className="weyvo-mini-grid"><img src="/open.jpg" alt="WEYVO Wallet open view"/><img src="/cards.jpg" alt="WEYVO Wallet storage"/><img src="/black.png" alt="WEYVO Wallet black finish"/></div></section>
    <section id="details" className="container section weyvo-details"><div><div className="eyebrow">BUILT FOR EVERYDAY LIFE</div><h2>Everything you need.<br/><em>Nothing you don't.</em></h2><p>Thoughtfully designed around practical storage, easy access and a compact profile. WEYVO brings together a water-resistant interior lining, reinforced metal hardware and multiple compartments in one clean everyday carry.</p><Link className="weyvo-cta" href={p?`/products/${p.slug}`:'/products/weyvo-wallet'}>See all details →</Link></div><img src="/brown.png" alt="WEYVO Wallet premium finish"/></section>
    <section className="container section feature-section"><div className="features"><div className="feature"><span>01</span><h3>Smart storage</h3><p>Multiple compartments keep cards, cash and essentials organized.</p></div><div className="feature"><span>02</span><h3>Secure build</h3><p>Reinforced metal hardware and a water-resistant interior lining.</p></div><div className="feature"><span>03</span><h3>Compact profile</h3><p>Designed to carry more without the bulky pocket feel.</p></div><div className="feature"><span>04</span><h3>Gift-ready</h3><p>A useful, timeless everyday wallet that is easy to gift.</p></div></div></section>
    <footer className="footer"><div className="container"><div className="brand">WEYVO</div><p>Premium everyday carry.</p><span>© 2026 WEYVO</span></div></footer>
  </main>
}
