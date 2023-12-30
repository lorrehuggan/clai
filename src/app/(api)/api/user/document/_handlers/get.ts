import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import db from '~/lib/db/client';
import { document, favorites } from '~/lib/db/schema/document';
import { authOptions } from '../../../auth/_lib/options';

export async function get(req: Request) {
  //TODO: get individual document
}
