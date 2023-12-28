import { sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { uuid } from 'uuidv4';
import db from '~/lib/db/client';
import { document } from '~/lib/db/schema/document';
import { tipTapNodeSchema } from '~/types/editor';
import { authOptions } from '../../auth/_lib/options';

export async function post(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const data = await req.json();

  if (!session) {
    return NextResponse.json({
      status: 'error',
      message: 'You must be signed in to post',
    });
  }

  const userId = session.user.id;

  const title = 'Random title';
  const content = data.content;
  const tags = ['temp tag', 'another tag'];

  tipTapNodeSchema.parse(content);

  try {
    await db.insert(document).values({
      content: JSON.stringify(content),
      title,
      id: uuid(),
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags,
    });

    return NextResponse.json({
      status: 'ok',
    });
  } catch (e) {
    console.log(e);
  }
}
