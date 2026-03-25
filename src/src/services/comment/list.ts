import type { Context } from 'hono';

/** コメント一覧を返す */
export async function getComments(c: Context<{ Bindings: Env }>) {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM comments ORDER BY id DESC LIMIT 10',
  ).all();

  return results;
}
