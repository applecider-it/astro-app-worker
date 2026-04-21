import type { Context } from 'hono';
import type { AppHonoType } from '../../types/types';

/** ツイート一覧を返す */
export async function getTweets(c: Context<AppHonoType>) {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM user_tweets ORDER BY id DESC LIMIT 10',
  ).all();

  return results;
}
