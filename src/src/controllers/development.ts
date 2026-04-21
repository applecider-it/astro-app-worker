import { Hono } from 'hono';
import type { AppHonoType } from '@/types/types';

import { hashPassword } from '@/services/app/security';

export const developmentRoute = new Hono<AppHonoType>();

// テスト
developmentRoute.get('/test', async (c) => {
  console.log(await hashPassword('testtest'))
  return c.json({
    status: true,
  });
});
