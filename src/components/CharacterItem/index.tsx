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

        <div className="character-content">
          <aside className="character-details">
            {post.acf.real_name ? (
              <h5><strong>Real Name:</strong> <br /><span>{post.acf.real_name}</span></h5>
            ) : (<></>)}

            {post.acf.alias ? (
              <h5><strong>Alias:</strong> <br /><span>{post.acf.alias}</span></h5>
            ) : (<></>)}
          </aside>
          <div
            className="character-bio"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
          ></div>
        </div>
      </div>
    </article>
  );
}
