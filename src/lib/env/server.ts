import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(8),
    GOOGLE_CLIENT_SECRET: z.string().min(8),
    DB_URL: z.string().min(8),
    OPEN_AI_KEY: z.string().min(8),
    CLOUDINARY_API_KEY: z.string().min(8),
    CLAUDINARY_API_SECRET: z.string().min(8),
  },
  experimental__runtimeEnv: process.env,
});
