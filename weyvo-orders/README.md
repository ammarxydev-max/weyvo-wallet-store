# WEYVO Orders System

A real order system for Vercel: Next.js + Vercel Postgres.

## Features
- Product page using the supplied WEYVO wallet images/video.
- Real checkout at `/checkout`.
- Orders stored in Postgres.
- Admin dashboard at `/admin`.
- Status workflow: New → Confirmed → Shipped → Delivered.
- WhatsApp handoff after checkout.

## Environment variables
Create a Vercel Postgres database, then set:
- `POSTGRES_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `WHATSAPP_NUMBER=201067515979`

The database table is created automatically on the first order/dashboard request.

## Local
`npm install`
`npm run dev`
