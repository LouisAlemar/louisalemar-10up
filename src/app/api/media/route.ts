import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET(request: Request) {
  const res = await fetch("http://wp.skyloproductions.com/wp-json/wp/v2/media?per_page=100");
  const data = await res.json();

  return NextResponse.json(data);
}
