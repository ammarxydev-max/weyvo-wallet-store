import './globals.css';
import './premium.css';
import './upgrade.css';
import './product-faq.css';
import './product-responsive.css';
import './site-fix.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
export const metadata: Metadata={title:'WEYVO Smart Wallet',description:'WEYVO smart wallet orders'};
export const viewport: Viewport={width:'device-width',initialScale:1,viewportFit:'cover'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','28173160672372335');fbq('track','PageView');`}</Script>{children}</body></html>}
