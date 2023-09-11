"use client";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bangers } from 'next/font/google'

import { fetchPosts, selectAllPosts } from '@/features/posts';
import { AppDispatch } from '@/redux/store';
import { fetchMedia, selectAllMedia } from '@/features/media';
import CharacterListingItem from '@/components/CharacterListingItem';

const bangers = Bangers({ subsets: ['latin'], weight: ["400"] })

const CharactersListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Use the selector to get all posts from the state
  const posts = useSelector(selectAllPosts);
  const media = useSelector(selectAllMedia);
  const postsStatus = useSelector((state: any) => state.posts.status);
  const error = useSelector((state: any) => state.posts.error);


  // Handle scroll event
  const handleScroll = (): void => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  };

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    dispatch(fetchMedia());
    dispatch(fetchPosts());
  }, [dispatch]);


  // Use effect to add scroll listener and to restore scroll position
  useEffect(() => {
    const savedScrollPosition: string | null = sessionStorage.getItem('scrollPosition');

    if (savedScrollPosition !== null && savedScrollPosition !== '0') {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: "smooth"
        });
      }, 2500)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <h2 className={bangers.className}>Characters</h2>
      <div className="characters-list">
        {posts.map((post, index) => {
          const mediaObj = media.find((obj) => obj.id === post.featured_media)

          return <CharacterListingItem key={post.id} index={index} post={post} image={mediaObj} />
        })}
      </div>
    </main>
  );
};

export default CharactersListPage;
