import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

/** ツイートを追加 */
export async function storeTweet(
  c: Context<AppHonoType>,
  user_id: number,
  content: string,
) {
  await c.env.DB.batch([
    c.env.DB.prepare(
      'INSERT INTO user_tweets (user_id, content) VALUES (?, ?)',
    ).bind(user_id, content),
  ]);
}
