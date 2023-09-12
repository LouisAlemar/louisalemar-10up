import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET(request: Request) {
  console.log(process.env.DEV_DB_URL)
  if (process.env.NODE_ENV === "development") {
    const res = await fetch(`${process.env.DEV_DB_URL}/posts`);
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    const res = await fetch("http://wp.skyloproductions.com/wp-json/wp/v2/posts");
    const data = await res.json();
    return NextResponse.json(data);
  }

}
