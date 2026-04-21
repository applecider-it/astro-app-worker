import type { Hono } from 'hono';
import type { AppHonoType } from '../types/types';

import { commentsRoute } from '../controllers/comments';
import { authRoute } from '../controllers/auth';

export function setRoutes(app: Hono<AppHonoType>) {
  app.route('/comments', commentsRoute);
  app.route('/auth', authRoute);
}
