'use client';
import { allDocuments } from '~/lib/services/documents/client';
import Card from './card';

import style from './style.module.css';

export default function Documents() {
  const { data, isLoading, isError } = allDocuments();
  return (
    <>
      <div className={style.cards}>
        {data?.map((doc) => <Card doc={doc} />)}
      </div>
    </>
  );
}
