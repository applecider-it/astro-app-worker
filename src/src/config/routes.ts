import type { Hono } from 'hono';
import type { AppHonoType } from '@/types/types';

import { tweetRoute } from '@/controllers/tweet';
import { commentRoute } from '@/controllers/comment';
import { authRoute } from '@/controllers/auth';

export function setRoutes(app: Hono<AppHonoType>) {
  app.route('/tweet', tweetRoute);
  app.route('/comment', commentRoute);
  app.route('/auth', authRoute);
}
