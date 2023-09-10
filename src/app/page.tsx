"use client";

import React, { useEffect } from 'react';
import { motion } from "framer-motion";
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
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <main>
        <section>
          <h1 className={bangers.className}>Welcome To My Marvel Blog Site!</h1>
        </section>
      </main>
    </motion.div>
  );
};

export default PostsList;
