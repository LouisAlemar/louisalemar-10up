import Image from "next/image";
import DOMPurify from 'dompurify';
import { Comic_Neue } from 'next/font/google'

import { Post } from "@/features/posts/post.type";
import { Media } from "@/features/media/media.type";

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ["400", "700"] })

export default function CharacterItem({ post, image }: { post: Post, image: Media | undefined }) {
  const imageThumbnail = image?.media_details.sizes.medium.source_url

  return (
    <article className='character-item fade-in' key={post.id}>
      <div className="character-item__image-container">
        <div className='character-item__background-image' style={{ backgroundImage: `url(${imageThumbnail})`, }}></div>
        {imageThumbnail ? (
          <Image className='character-item__image' src={imageThumbnail} width={264} height={300} alt={image.alt_text} priority />
        ) : (
          <p>No Image Found!</p>
        )}
      </div>
      <div className="character-item__content-container">
        <h2 className={`${comicNeue.className} character-item__title`}>{post.title.rendered}</h2>

        <div className="character-item__character-content">
          <aside className="character-item__character-details">
            {post.acf.real_name && (
              <h5><strong>Real Name:</strong> <br /><span>{post.acf.real_name}</span></h5>
            )}

            {post.acf.alias && (
              <h5><strong>Alias:</strong> <br /><span>{post.acf.alias}</span></h5>
            )}
          </aside>
          <div
            className="character-item__character-bio"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
          ></div>
        </div>
      </div>
    </article>
  );
}
