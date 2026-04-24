import { Hono } from 'hono';
import type { AppHonoType } from '@/types/types';

export const chatRoute = new Hono<AppHonoType>();

// チャット受信
chatRoute.get('/ws/:room', async (c) => {
  const room = c.req.param('room')
  const id = c.env.CHAT.idFromName(room)
  const stub = c.env.CHAT.get(id)

  return stub.fetch(c.req.raw)
})