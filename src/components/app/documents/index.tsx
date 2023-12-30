'use client';
import { allDocuments } from '~/lib/services/documents/client';
import Card from './card';

import style from './style.module.css';

export default function Documents() {
  const { data, isLoading, isError } = allDocuments();
  return (
    <>
      {isLoading && (
        <div className={style.loading}>
          <p>Loading...</p>
        </div>
      )}
      {!data?.length && !isLoading && (
        <div className={style.null}>
          <p>No Documents</p>
          <button>Add Document</button>
        </div>
      )}
      <div className={style.cards}>
        {data && data?.map((doc) => <Card key={doc.id} doc={doc} />)}
      </div>
    </>
  );
}
