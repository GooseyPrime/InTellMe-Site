import { HERO_WEBP_B64 } from '../lib/hero-webp';

export const prerender = true;

export function GET() {
  const buf = Buffer.from(HERO_WEBP_B64, 'base64');
  return new Response(buf, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
