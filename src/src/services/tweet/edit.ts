import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

import { prepareBind } from '@/services/app/db';

/** ツイートを追加 */
export async function storeTweet(
  c: Context<AppHonoType>,
  user_id: number,
  content: string,
) {
  const st = prepareBind(
    c,
    'INSERT INTO user_tweets (user_id, content) VALUES (?, ?)',
    [user_id, content],
  );
  const result = await st.run();

  console.log({ result });

  return result.meta.changes;
}
