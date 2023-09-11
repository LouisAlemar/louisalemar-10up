"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bangers } from 'next/font/google'

import { fetchPosts, fetchImageById, selectAllPosts } from '@/features/posts';
import { AppDispatch } from '@/redux/store';
import { fetchMedia, selectAllMedia } from '@/features/media';
import CharacterListingItem from '@/components/CharacterListingItem';

const bangers = Bangers({ subsets: ['latin'], weight: ["400"] })

const CharactersListPage: React.FC = () => {
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

  return (
    <main>
      <h2 className={bangers.className}>Characters</h2>
      <div className="post-item-container">
        {posts.map((post, index) => {
          const mediaObj = media.find((obj) => obj.id === post.featured_media)
          const imageThumbnail: string | undefined = mediaObj?.media_details.sizes.thumbnail.source_url

          return <CharacterListingItem key={post.id} index={index} post={post} image={mediaObj} />
        })}
      </div>
    </main>
  );
};

export default CharactersListPage;
