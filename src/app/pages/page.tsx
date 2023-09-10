"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPages, selectAll } from '@/features/pages';
import { AppDispatch } from '@/redux/store';
import DOMPurify from 'dompurify';
import Link from 'next/link';

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
    <main>
      <h2>Pages</h2>
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
  );
};

export default PagesList;
