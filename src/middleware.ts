import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function middleware(
  req: NextRequest,
  res: NextResponse,
  next: NextFunction
) { }

export const config = {
  matcher: ['/app'],
};
