"use client"

import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { Post, selectPostBySlug, selectAll, fetchPosts } from '@/features/posts'
import { AppDispatch } from "@/redux/store";
import { useEffect } from 'react';
import DOMPurify from 'dompurify';

const PostItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useParams()
  const slug = router.slug
  const allPosts: Post[] = useSelector(selectAll);
  const post = selectPostBySlug(allPosts, slug as string);
  const postsStatus = useSelector((state: any) => state.posts.status);
  const error = useSelector((state: any) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {error}</div>;
  }


  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <p
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
      ></p>
    </div>
  );
}

export default PostItem;