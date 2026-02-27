import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const siteId = process.env.SITE_ID || 'unknown';
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    await redis.rpush(
      `email_signups:${siteId}`,
      JSON.stringify({ email, ip, timestamp: new Date().toISOString() })
    );
    await redis.incr(`email_signups_count:${siteId}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save signup' }, { status: 500 });
  }
}
