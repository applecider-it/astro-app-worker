import type { Context } from 'hono';
import { setCookie } from 'hono/cookie';
import { encryptSession } from '@/services/app/encryptSession';
import { sessionName } from '@/config/contants';
import { corsCookieOptions } from '@/services/app/cookie';

import type { AppHonoType } from '@/types/types';

import { hashPassword } from '@/services/app/security';

import type { GoogleProfile } from './google';

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

  if (user.password_hash === (await hashPassword(password))) {
    delete user.password_hash;
    return user;
  }
  return null;
}

/** Google認証ユーザーのアップサート */
export async function upsertGoogle(
  c: Context<AppHonoType>,
  profile: GoogleProfile,
) {
  console.log({profile})
}

/** 認証開始 */
export async function startAuth(
  c: Context<AppHonoType>,
  user: Record<string, unknown>,
) {
  const ret = {
    user,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  };
  const token = await encryptSession(ret);

  console.log({ token });

  setCookie(c, sessionName, token, corsCookieOptions);
}
