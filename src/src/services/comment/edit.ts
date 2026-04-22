import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

import { prepareBind } from '@/services/app/db';

/** コメントを追加 */
export async function storeComment(
  c: Context<AppHonoType>,
  author: string,
  content: string,
) {
  const st = prepareBind(
    c,
    'INSERT INTO comments (author, content) VALUES (?, ?)',
    [author, content],
  );

  const result = await c.env.DB.batch([st]);

  console.log({ result });
  console.log({ row0: result[0] });
}
