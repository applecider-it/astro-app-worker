import { Hono } from 'hono';
import { getTweets } from '../services/tweet/list';
import { storeTweet } from '../services/tweet/edit';
import type { AppHonoType } from '../types/types';
import { auth } from '../services/app/middleware';

export const tweetRoute = new Hono<AppHonoType>();

// ツイート一覧
tweetRoute.get('/', async (c) => {
  const results = await getTweets(c);

  return c.json(results);
});

// ツイート追加
tweetRoute.post('/store', auth, async (c) => {
  const { user } = c.get('auth');
  const { content } = await c.req.json();

  if (!content) {
    return c.text('content are required', 400);
  }

  await storeTweet(c, user.id, content);

  return c.json({ status: true }, 201);
});
