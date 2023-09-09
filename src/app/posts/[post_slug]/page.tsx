"use client"

import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { selectPostBySlug, selectAll, fetchPosts, fetchPostsStatus, fetchPostsError } from '@/features/posts'
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from 'react';
import DOMPurify from 'dompurify';

const PostItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useParams()
  const slug = router.post_slug

  const post = useSelector((state: RootState) =>
    selectPostBySlug(state, slug as string)
  );

  const postsStatus = useSelector((state: RootState) => {
    return fetchPostsStatus(state)
  })

  const error = useSelector((state: RootState) => {
    return fetchPostsError(state)
  })

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