import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import db from '~/lib/db/client';
import { document } from '~/lib/db/schema/document';
import { authOptions } from '../../../auth/_lib/options';

export async function remove(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({
      status: 'error',
      message: 'You must be signed in to see ',
    });
  }

  const data = await req.json();

  const id = data.id;

  try {
    const doc_id = await db
      .delete(document)
      .where(eq(document.id, id))
      .returning({
        id: document.id,
      });
    return NextResponse.json({
      status: 'ok',
      id: doc_id,
    });
  } catch (e) {
    console.log(e);
  }
}
