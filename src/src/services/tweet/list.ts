import type { Context } from 'hono';
import type { AppHonoType } from '../../types/types';

/** ツイート一覧を返す */
export async function getTweets(c: Context<AppHonoType>) {
  const { results } = await c.env.DB.prepare(`
    SELECT
      user_tweets.id,
      user_tweets.content,
      user_tweets.created_at,

      users.id   AS user_id,
      users.name AS user_name,
      users.email AS user_email

    FROM user_tweets
    INNER JOIN users
      ON users.id = user_tweets.user_id

    ORDER BY user_tweets.id DESC
    LIMIT 10
  `).all();

  return results;
}
