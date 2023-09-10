"use client"

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux";
import { selectPageBySlug, selectAll, fetchPages, fetchPagesStatus, fetchPagesError, fetchPageBySlug } from '@/features/pages'
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
    dispatch(fetchPageBySlug(slug as string));
  }, [dispatch, slug]);

  if (pagesStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (pagesStatus === 'failed') {
    return <div>Error: {error}</div>;
  }


  if (!page) return <div>Page not found</div>;

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
        <h2>{page.title.rendered}</h2>
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content.rendered) }}
        ></p>
      </main>
    </motion.div>
  );
}

export default PageItem;