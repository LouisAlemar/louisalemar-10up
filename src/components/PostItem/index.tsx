import Link from "next/link";
import Image from "next/image";
import DOMPurify from 'dompurify';
import { Comic_Neue } from 'next/font/google'

import { Post } from "@/features/posts/post.type";

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ["400", "700"] })

export default function PostItem({ post, imageThumbnail }: { post: Post, imageThumbnail: string | undefined }) {
  return (
    <div className='post-item' key={post.id}>
      <Link href={`/posts/${post.slug}`} >
        <div className='image-container'>
          <Image src={imageThumbnail as string} width={150} height={150} alt='' />
        </div>
        <div className='content-container'>
          <h3 className={comicNeue.className}>{post.title.rendered}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt.rendered) }}
          ></p>
        </div>
      </Link>
    </div>
  );
}
