import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

import { prepareBind } from '@/services/app/db';

/** コメント一覧を返す */
export async function getComments(c: Context<AppHonoType>) {
  const st = prepareBind(
    c,
    'SELECT * FROM comments ORDER BY id DESC LIMIT 10',
    [],
  );

  const { results } = await st.all();

  return results;
}
