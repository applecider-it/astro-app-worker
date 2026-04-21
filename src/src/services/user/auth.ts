import type { Context } from 'hono';

import type { AppHonoType } from '../../types/types';

/** ログイン処理 */
export async function execLogin(
  c: Context<AppHonoType>,
  email: string,
  password: string,
) {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
  )
    .bind(email)
    .all();

  if (results.length === 0) return null;

  const user = results[0];

  if (user.password_hash === password) {
    delete user.password_hash;
    return {
      user,
      exp: Date.now() + 1000 * 60 * 60 * 24,
    };
  }
  return null;
}
