import Link from "next/link";
import Image from "next/image";
import DOMPurify from 'dompurify';
import { Comic_Neue } from 'next/font/google'

import { Post } from "@/features/posts/post.type";

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ["400", "700"] })

export default function CharacterItem({ post, imageThumbnail }: { post: Post, imageThumbnail: string | undefined }) {
  return (
    <div className='character-item-post' key={post.id}>
      <div className="image-container">
        {imageThumbnail ? (
          <Image src={imageThumbnail} width={264} height={300} alt='' priority />

        ) : (
          <p>No Image Found!</p>
        )}
      </div>
      <div className="content-container">
        <h2>{post.title.rendered}</h2>
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
        ></p>
      </div>
    </div>
  );
}
