import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const timestamp = Math.floor(Date.now() / 1000);
  const res = await fetch(`http://wp.skyloproductions.com/wp-json/wp/v2/posts/?${timestamp}`)
  const data = await res.json();
  return NextResponse.json(data)
}