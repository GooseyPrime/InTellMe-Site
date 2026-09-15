import { HERO_JPG_B64 } from '../lib/hero-jpg';

export const prerender = true;

export function GET() {
  const buf = Buffer.from(HERO_JPG_B64, 'base64');
  return new Response(buf, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
