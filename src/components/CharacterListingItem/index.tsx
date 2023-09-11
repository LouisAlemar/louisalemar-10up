import Link from "next/link";
import Image from "next/image";
import DOMPurify from 'dompurify';
import { Comic_Neue } from 'next/font/google'

import { Post } from "@/features/posts/post.type";
import { Media } from "@/features/media/media.type";

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ["400", "700"] })

export default function CharacterListingItem({ index, post, image }: { index: number, post: Post, image: Media | undefined }) {
  const imageThumbnail = image?.media_details.sizes.medium.source_url

  return (
    <article className={`character-card fade-in character-card--item-${index}`} key={post.id}>
      <Link href={`/characters/${post.slug}`} >
        <div className='character-card__background-image' style={{ backgroundImage: `url(${imageThumbnail})`, }}></div>
        <div className='character-card__image-container'>
          {imageThumbnail && (
            <Image className='character-card__image' src={imageThumbnail as string} width={150} height={150} alt={image.alt_text} />
          )}
        </div>
        <div className='character-card__content-container'>
          <h3 className={comicNeue.className}>{post.title.rendered}</h3>
          <div
            className='character-card__content-excerpt'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt.rendered) }}
          ></div>
        </div>
      </Link>
    </article>
  );
}
