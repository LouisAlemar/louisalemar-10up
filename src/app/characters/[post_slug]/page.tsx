"use client"

import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { selectPostBySlug, fetchPostsStatus, fetchPostsError, fetchPostBySlug } from '@/features/posts'
import { fetchMediaById, selectMediaById } from '@/features/media';
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from 'react';

import CharacterItem from '@/components/CharacterItem';

const CharacterItemPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useParams()
  const slug = router.post_slug

  const post = useSelector((state: RootState) =>
    selectPostBySlug(state, slug as string)
  );

  const postImageId = post?.featured_media

  const image = useSelector((state: RootState) =>
    selectMediaById(state, postImageId as any)
  );

  const postsStatus = useSelector((state: RootState) => {
    return fetchPostsStatus(state)
  })

  const error = useSelector((state: RootState) => {
    return fetchPostsError(state)
  })

  useEffect(() => {
    dispatch(fetchPostBySlug(slug as string));
    dispatch(fetchMediaById(postImageId));
  }, [dispatch, slug, postImageId]);

  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!post) return <div>Post not found</div>;

  return (
    <main>
      <CharacterItem post={post} image={image} />
    </main>
  );
}

export default CharacterItemPage;