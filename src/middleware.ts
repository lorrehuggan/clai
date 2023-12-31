import { withAuth } from 'next-auth/middleware';

export const config = { matcher: ['/app', '/app/:path*'] };
