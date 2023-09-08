"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectAllPosts } from '@/features/posts';
import { AppDispatch } from '@/redux/store';
import DOMPurify from 'dompurify';
import { fetchPages } from '@/features/pages';
import { fetchUsers } from '@/features/users';

const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPages());
    dispatch(fetchUsers());
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

  console.log(posts);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title.rendered}</h3>
            <p
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
            ></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
