import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const res = await fetch("http://wp.skyloproductions.com/wp-json/wp/v2/posts")
  const data = await res.json();
  return NextResponse.json(data)
}