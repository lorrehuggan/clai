import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '~/app/(api)/api/auth/_lib/options';
import db from '~/lib/db/client';
import { Document, document } from '~/lib/db/schema/document';
import { allDocuments } from '~/lib/services/documents/client';
import Card from './card';

import style from './style.module.css';

export default async function Documents() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  const data = (await db
    .select()
    .from(document)
    .where(eq(document.userId, session.user.id))) as Document[];

  return (
    <>
      <div className={style.cards}>
        {data && data?.map((doc) => <Card key={doc.id} doc={doc} />)}
      </div>
    </>
  );
}
