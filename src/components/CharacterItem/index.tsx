import Image from "next/image";
import DOMPurify from 'dompurify';
import { Comic_Neue } from 'next/font/google'

import { Post } from "@/features/posts/post.type";
import { Media } from "@/features/media/media.type";

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ["400", "700"] })

export default function CharacterItem({ post, image }: { post: Post, image: Media | undefined }) {
  const imageThumbnail = image?.media_details.sizes.medium.source_url

  return (
    <article className='character-item-post fade-in' key={post.id}>
      <div className="image-container">
        {imageThumbnail ? (
          <Image src={imageThumbnail} width={264} height={300} alt={image.alt_text} />
        ) : (
          <p>No Image Found!</p>
        )}
      </div>
      <div className="content-container">
        <h2 className={comicNeue.className}>{post.title.rendered}</h2>
        <h5>Real Name: <br />{post.acf.real_name}</h5>
        <h5>Alias: <br />{post.acf.alias}</h5>
        <div
          className="character-bio"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
        ></div>
      </div>
    </article>
  );
}
