"use client"

import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { selectPageBySlug, selectAll, fetchPages, fetchPagesStatus, fetchPagesError } from '@/features/pages'
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from 'react';
import DOMPurify from 'dompurify';

const PageItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useParams()
  const slug = router.page_slug

  const page = useSelector((state: RootState) =>
    selectPageBySlug(state, slug as string)
  );

  const pagesStatus = useSelector((state: RootState) => {
    return fetchPagesStatus(state)
  })

  const error = useSelector((state: RootState) => {
    return fetchPagesError(state)
  })

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  if (pagesStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (pagesStatus === 'failed') {
    return <div>Error: {error}</div>;
  }


  if (!page) return <div>Page not found</div>;

  return (
    <div>
      <h2>{page.title.rendered}</h2>
      <p
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content.rendered) }}
      ></p>
    </div>
  );
}

export default PageItem;