import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

/** コメントを追加 */
export async function storeComment(
  c: Context<AppHonoType>,
  author: string,
  content: string,
) {
  await c.env.DB.batch([
    c.env.DB.prepare(
      'INSERT INTO comments (author, content) VALUES (?, ?)',
    ).bind(author, content),
  ]);
}
