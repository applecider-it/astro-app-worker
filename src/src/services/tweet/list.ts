import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

import { prepareBind } from '@/services/app/db';

/** ツイート一覧を返す */
export async function getTweets(c: Context<AppHonoType>) {
  const st = prepareBind(
    c,
    `
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
  `,
    [],
  );

  const { results } = await st.all();

  return results;
}
