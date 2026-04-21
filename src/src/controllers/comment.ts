import { Hono } from 'hono';
import { getComments } from '../services/comment/list';
import { storeComment } from '../services/comment/edit';
import type { AppHonoType } from '../types/types';

export const commentRoute = new Hono<AppHonoType>();

// コメント一覧
commentRoute.get('/', async (c) => {
  const results = await getComments(c);

  return c.json(results);
});

//　コメント追加
commentRoute.post('/store', async (c) => {
  const { author, content } = await c.req.json();

  if (!author || !content) {
    return c.text('author and content are required', 400);
  }

  await storeComment(c, author, content);

  return c.json({ status: true }, 201);
});
