"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectAllPosts } from '@/features/posts';
import { AppDispatch } from '@/redux/store';
import { Bangers } from 'next/font/google'

const bangers = Bangers({ subsets: ['latin'], weight: ["400"] })

const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Use the selector to get all posts from the state
  const posts = useSelector(selectAllPosts);
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
      <section>
        <h1 className={bangers.className}>Welcome To My Marvel Blog Site!</h1>
      </section>
    </main>
  );
};

export default PostsList;
