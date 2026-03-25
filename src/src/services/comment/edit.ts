import type { Context } from 'hono';

/** コメントを追加 */
export async function storeComment(
  c: Context<{ Bindings: Env }>,
  author: string,
  content: string,
) {
  await c.env.DB.prepare('INSERT INTO comments (author, content) VALUES (?, ?)')
    .bind(author, content)
    .run();
}
