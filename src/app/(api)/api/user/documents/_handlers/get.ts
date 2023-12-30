import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import db from '~/lib/db/client';
import { document } from '~/lib/db/schema/document';
import { authOptions } from '../../../auth/_lib/options';

export async function get(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({
      status: 'error',
      message: 'You must be signed in to see ',
    });
  }

  const result = await db
    .select()
    .from(document)
    .where(eq(document.userId, session.user.id));

  return NextResponse.json([...result]);
}
