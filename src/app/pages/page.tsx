"use client";

import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPages, selectAll } from '@/features/pages';
import { AppDispatch } from '@/redux/store';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { Bangers } from 'next/font/google'

const bangers = Bangers({ subsets: ['latin'], weight: ["400"] })

const PagesList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch pages from the API when the component mounts
  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  // Use the selector to get all pages from the state
  const pages = useSelector(selectAll);
  const pagesStatus = useSelector((state: any) => state.pages.status);
  const error = useSelector((state: any) => state.pages.error);

  if (pagesStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (pagesStatus === 'failed') {
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
        <h2 className={bangers.className}>Pages</h2>
        <ul>
          {pages.map((page) => (
            <Link href={`/pages/${page.slug}`} key={page.id}>
              <li>
                <h3>{page.title.rendered}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content.rendered) }}
                ></p>
              </li>
            </Link>
          ))}
        </ul>
      </main>
    </motion.div>
  );
};

export default PagesList;
