export const dynamic = 'force-dynamic'
export const revalidate = 0;
import { IncomingMessage } from 'http';
import * as http from 'http';
import { NextResponse } from 'next/server';

const options = {
  hostname: 'wp.skyloproductions.com',
  path: '/wp-json/wp/v2/posts',
  method: 'GET'
};


const fetchThisUrlUsingNodejs = async (params: http.RequestOptions, postData?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const req = http.request(params, (res) => {
      // reject on bad status
      if (res.statusCode! < 200 || res.statusCode! >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
      }
      // cumulate data
      let body: Buffer[] = [];
      res.on('data', (chunk: Buffer) => {
        body.push(chunk);
      });
      // resolve on end
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(Buffer.concat(body).toString());
          resolve(parsedBody);
        } catch (e) {
          reject(e);
        }
      });
    });

    // reject on request error
    req.on('error', (err: Error) => {
      reject(err);
    });

    if (postData) {
      req.write(postData);
    }
    // IMPORTANT
    req.end();
  });
}


export async function GET(request: Request) {
  const res = await fetch("http://wp.skyloproductions.com/wp-json/wp/v2/posts");
  const data = await res.json();
  console.log(data)

  return NextResponse.json(data);
}
