"use client"

import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { Page, selectPageBySlug, selectAll, fetchPages } from '@/features/pages'
import { AppDispatch } from "@/redux/store";
import { useEffect } from 'react';
import DOMPurify from 'dompurify';

const PageItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useParams()
  const slug = router.page_slug
  const allPages: Page[] = useSelector(selectAll);
  const page = selectPageBySlug(allPages, slug as string);
  const pagesStatus = useSelector((state: any) => state.pages.status);
  const error = useSelector((state: any) => state.pages.error);

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