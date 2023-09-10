"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { Bangers } from 'next/font/google'
import Image from 'next/image';

import { fetchPosts, fetchImageById, selectAllPosts } from '@/features/posts';
import { AppDispatch } from '@/redux/store';
import { fetchMedia, selectAllMedia } from '@/features/media';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const bangers = Bangers({ subsets: ['latin'], weight: ["400"] })

const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    dispatch(fetchMedia());
    dispatch(fetchPosts());
  }, [dispatch]);

  // Use the selector to get all posts from the state
  const posts = useSelector(selectAllPosts);
  const media = useSelector(selectAllMedia);
  const postsStatus = useSelector((state: any) => state.posts.status);
  const error = useSelector((state: any) => state.posts.error);

  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  console.log(posts)
  console.log(media)

  // const postMedia = media[post.featured_media]

  return (
    <main>
      <h2 className={bangers.className}>Posts</h2>
      <ul>
        {posts.map((post) => {
          const mediaObj = media.find((obj) => obj.id === post.featured_media)

          console.log(mediaObj)

          // if (!mediaObj) {
          //   throw new Error("No Featured Image Found!")
          // }

          const imageThumbnail: string | undefined = mediaObj?.media_details.sizes.thumbnail.source_url

          return (

            <Link href={`/posts/${post.slug}`} key={post.id}>
              <li>
                <Image src={imageThumbnail as string} width={150} height={150} alt='' />
                <h3>{post.title.rendered}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
                ></p>
              </li>
            </Link>
          )
        }
        )}
      </ul>
    </main>
  );
};

export default PostsList;
