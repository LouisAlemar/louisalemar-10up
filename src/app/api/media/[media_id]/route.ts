import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET(request: Request, response: NextApiResponse) {
  if (!request.url) {
    return response.status(400).json({ error: 'URL is not provided' });
  }

  const segments = request.url.split('/')
  const postId = segments[segments.length - 1]

  const res = await fetch(`http://wp.skyloproductions.com/wp-json/wp/v2/media/${postId}`);
  const data = await res.json();

  return NextResponse.json(data);

}

